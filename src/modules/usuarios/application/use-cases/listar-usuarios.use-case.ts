import { UsuarioRepository } from '../../domain/repositories/usuario.repository';
import { Usuario } from '../../domain/entities/usuario';

export class ListarUsuariosUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(): Promise<Usuario[]> {
    return await this.usuarioRepository.findAll();
  }
}
