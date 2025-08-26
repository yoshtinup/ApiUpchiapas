import { Request, Response } from 'express';
import { CrearUsuarioUseCase } from '../../../application/use-cases/crear-usuario.use-case';
import { ListarUsuariosUseCase } from '../../../application/use-cases/listar-usuarios.use-case';
import { ActualizarUsuarioUseCase } from '../../../application/use-cases/actualizar-usuario.use-case';
import { EliminarUsuarioUseCase } from '../../../application/use-cases/eliminar-usuario.use-case';
import { LoginUseCase } from '../../../application/use-cases/login.use-case';
import { TypeOrmUsuarioRepository } from '../../persistence/repositories/typeorm-usuario.repository';

export class UsuarioController {
  private crearUsuarioUseCase: CrearUsuarioUseCase;
  private listarUsuariosUseCase: ListarUsuariosUseCase;
  private actualizarUsuarioUseCase: ActualizarUsuarioUseCase;
  private eliminarUsuarioUseCase: EliminarUsuarioUseCase;
  private loginUseCase: LoginUseCase;

  constructor() {
    const usuarioRepository = new TypeOrmUsuarioRepository();
    this.crearUsuarioUseCase = new CrearUsuarioUseCase(usuarioRepository);
    this.listarUsuariosUseCase = new ListarUsuariosUseCase(usuarioRepository);
    this.actualizarUsuarioUseCase = new ActualizarUsuarioUseCase(usuarioRepository);
    this.eliminarUsuarioUseCase = new EliminarUsuarioUseCase(usuarioRepository);
    this.loginUseCase = new LoginUseCase(usuarioRepository);
  }

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await this.listarUsuariosUseCase.execute();
      
      if (usuarios.length === 0) {
        res.status(404).json({ message: 'No se encontraron usuarios' });
        return;
      }

      const usuariosResponse = usuarios.map(usuario => ({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email.getValue(),
        telefono: usuario.telefono,
        estado: usuario.estado ? 'Activo' : 'Inactivo',
        tipo: usuario.tipo
        // createdAt y updatedAt temporalmente removidos
        // createdAt: usuario.createdAt,
        // updatedAt: usuario.updatedAt
      }));

      res.json(usuariosResponse);
    } catch (error: any) {
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
  }

  async listarTutores(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await this.listarUsuariosUseCase.execute();

      const tutores = usuarios.filter(u => (u.tipo || '').toLowerCase() === 'tutor');

      if (tutores.length === 0) {
        res.status(404).json({ message: 'No se encontraron tutores' });
        return;
      }

      const respuesta = tutores.map(usuario => ({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email.getValue(),
        telefono: usuario.telefono,
        estado: usuario.estado ? 'Activo' : 'Inactivo',
        tipo: usuario.tipo
      }));

      res.json(respuesta);
    } catch (error: any) {
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
  }

  async crear(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, email, telefono, tipo, password } = req.body;

      if (!nombre || !email || !telefono || !tipo) {
        res.status(400).json({ message: 'Faltan campos requeridos' });
        return;
      }

      const usuario = await this.crearUsuarioUseCase.execute({
        nombre,
        email,
        telefono,
        tipo,
        password
      });

      res.status(201).json({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email.getValue(),
        telefono: usuario.telefono,
        estado: 'Activo',
        tipo: usuario.tipo
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async actualizar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nombre, email, telefono, estado, tipo } = req.body;

      const usuario = await this.actualizarUsuarioUseCase.execute(parseInt(id), {
        nombre,
        email,
        telefono,
        estado,
        tipo
      });

      if (!usuario) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }

      res.json({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email.getValue(),
        telefono: usuario.telefono,
        estado: usuario.estado ? 'Activo' : 'Inactivo',
        tipo: usuario.tipo
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async eliminar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await this.eliminarUsuarioUseCase.execute(parseInt(id));

      if (!success) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: 'Email y contraseña son requeridos' });
        return;
      }

      const result = await this.loginUseCase.execute({ email, password });
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  async recuperarContrasena(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ message: 'Email es requerido' });
        return;
      }

      // Aquí implementarías la lógica de recuperación de contraseña
      // Por ahora, solo devolvemos un mensaje de éxito
      res.json({ 
        message: 'Se ha enviado un correo con las instrucciones para recuperar tu contraseña',
        success: true 
      });
    } catch (error: any) {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}
