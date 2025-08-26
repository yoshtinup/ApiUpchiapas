import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { Email } from '../../../../shared/domain/value-objects/email';

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  usuario: {
    id: number;
    nombre: string;
    email: string;
    tipo: string;
  };
  token: string;
}

export class LoginUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(dto: LoginDto): Promise<LoginResponse> {
    const email = new Email(dto.email);
    const usuario = await this.usuarioRepository.findByEmail(email);

    if (!usuario) {
      throw new Error('Credenciales inválidas');
    }

    if (!usuario.isActive()) {
      throw new Error('Usuario inactivo');
    }

    // Comparación directa de password sin encriptación
    const isValidPassword = dto.password === usuario.password;
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { 
        id: usuario.id, 
        email: usuario.email.getValue(),
        tipo: usuario.tipo 
      },
      'secret-key-upchiapas',
      { expiresIn: '24h' }
    );

    return {
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email.getValue(),
        tipo: usuario.tipo,
      },
      token,
    };
  }
}
