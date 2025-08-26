import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { Usuario } from '../../domain/entities/usuario';
import { Email } from '../../../../shared/domain/value-objects/email';

export interface CrearUsuarioDto {
  nombre: string;
  email: string;
  telefono: string;
  tipo: string;
  password?: string;
}

export class CrearUsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(dto: CrearUsuarioDto): Promise<Usuario> {
    const email = new Email(dto.email);
    
    // Verificar si el usuario ya existe
    const existingUser = await this.usuarioRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('El usuario con este email ya existe');
    }

    // Password sin encriptar (modificado para guardar en texto plano)
    const password = dto.password || dto.tipo;
    // const bcrypt = require('bcryptjs');
    // const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = new Usuario(
      0, // ID será asignado por la base de datos
      dto.nombre,
      email,
      dto.telefono,
      true, // estado activo por defecto
      dto.tipo,
      password
    );

    return await this.usuarioRepository.create(usuario);
  }
}
