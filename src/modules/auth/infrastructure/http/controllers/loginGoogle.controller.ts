import { Request, Response } from 'express';
import { GoogleAuthService } from '../../../application/services/google-auth.service';
import { TypeOrmUsuarioRepository } from '../../../../usuarios/infrastructure/persistence/repositories/typeorm-usuario.repository';
import { Email } from '../../../../../shared/domain/value-objects/email';
import { config } from '../../../../../shared/infrastructure/config/environment.config';

const jwt = require('jsonwebtoken');

export class LoginGoogleController {
  private google = new GoogleAuthService();
  private usuarios = new TypeOrmUsuarioRepository();

  // GET /auth/google/start -> redirect URL
  start = async (req: Request, res: Response) => {
    const url = this.google.getAuthUrl();
    res.json({ url });
  };

  // GET /auth/google/callback?code=...
  callback = async (req: Request, res: Response) => {
    const FRONTEND_ORIGIN = config.frontend.origin;
    const redirectBase = `${FRONTEND_ORIGIN.replace(/\/$/, '')}/login`;

    try {
      const code = req.query.code as string;
      if (!code) {
        const url = new URL(redirectBase);
        url.searchParams.set('error', 'missing_code');
        return res.redirect(302, url.toString());
      }

      const tokens = await this.google.exchangeCodeForTokens(code);
      const id_token = tokens.id_token;
      if (!id_token) {
        const url = new URL(redirectBase);
        url.searchParams.set('error', 'missing_id_token');
        return res.redirect(302, url.toString());
      }

      const profile = await this.google.verifyIdToken(id_token);
      const result = await this.findOrCreateAndSign(profile);

      // Evaluar estado y rol
      const isActive = result.usuarioEstado;
      const tipo = result.user.tipo;
      const isValidRole = ['Director', 'Tutor', 'Docente', 'alumno'].includes(tipo); // Ajusta si es necesario

      const url = new URL(redirectBase);

      if (!isActive || !isValidRole) {
        url.searchParams.set('status', 'pending');
        url.searchParams.set('email', result.user.email);
        return res.redirect(302, url.toString());
      }

      url.searchParams.set('status', 'ok');
      url.searchParams.set('token', result.token);
      url.searchParams.set('id', String(result.user.id));
      url.searchParams.set('tipo', tipo);
      return res.redirect(302, url.toString());
    } catch (e: any) {
      console.error('Google callback error:', e);
      const FRONTEND_ORIGIN_FALLBACK = config.frontend.origin || 'http://localhost:5173';
      const url = new URL(`${FRONTEND_ORIGIN_FALLBACK.replace(/\/$/, '')}/login`);
      url.searchParams.set('error', 'google_callback_failed');
      url.searchParams.set('message', encodeURIComponent(e.message || 'Error desconocido'));
      return res.redirect(302, url.toString());
    }
  };

  // POST /auth/google/token { idToken }
  verifyToken = async (req: Request, res: Response) => {
    try {
      const { idToken } = req.body;
      if (!idToken) return res.status(400).json({ error: 'idToken requerido' });

      const profile = await this.google.verifyIdToken(idToken);
      const { user, token } = await this.findOrCreateAndSign(profile);
      return res.json({ usuario: user, token });
    } catch (e: any) {
      console.error('Google verifyToken error:', e);
      return res.status(401).json({ error: 'Token de Google inválido', message: e.message });
    }
  };

  private async findOrCreateAndSign(profile: { sub: string; email: string; name?: string }) {
    // Buscar por email
    const usuarioDom = await this.usuarios.findByEmail(new Email(profile.email));

    let usuario = usuarioDom;
    if (!usuarioDom) {
      // Crear usuario básico inactivo para aprobación
      usuario = await this.usuarios.create({
        id: 0 as any, // ignored by repo
        nombre: profile.name || profile.email.split('@')[0],
        email: new Email(profile.email),
        telefono: '',
        estado: false, // boolean false (pendiente de aprobación)
        tipo: 'alumno',
        password: 'google-oauth',
        createdAt: undefined,
        updatedAt: undefined,
      } as any);
    }

    const payload = {
      id: usuario!.id,
      email: usuario!.email.getValue(),
      tipo: usuario!.tipo,
      provider: 'google',
      sub: profile.sub,
    };

    const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

    const user = {
      id: usuario!.id,
      nombre: usuario!.nombre,
      email: usuario!.email.getValue(),
      tipo: usuario!.tipo,
    };

    return { user, token, usuarioEstado: usuario!.isActive() };
  }
}
