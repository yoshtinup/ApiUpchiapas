import { UsuarioRepository } from '../../domain/repositories/usuario.repository';

export class EliminarUsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute(id: number): Promise<boolean> {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    return await this.usuarioRepository.delete(id);
  }
}
