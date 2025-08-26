import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { Usuario } from '../../domain/entities/usuario';
import { Email } from '../../../../shared/domain/value-objects/email';

export interface ActualizarUsuarioDto {
  nombre?: string;
  email?: string;
  telefono?: string;
  estado?: boolean;
  tipo?: string;
}

export class ActualizarUsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(id: number, dto: ActualizarUsuarioDto): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const updateData: Partial<Usuario> = {};
    
    if (dto.nombre) updateData.nombre = dto.nombre;
    if (dto.email) updateData.email = new Email(dto.email);
    if (dto.telefono) updateData.telefono = dto.telefono;
    if (dto.estado !== undefined) updateData.estado = dto.estado;
    if (dto.tipo) updateData.tipo = dto.tipo;

    return await this.usuarioRepository.update(id, updateData);
  }
}
