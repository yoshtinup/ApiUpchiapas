import { IGrupoRepository } from '../../domain/repositories/grupo.repository';
import { Grupo } from '../../domain/entities/grupo';

export class ActualizarGrupoUseCase {
  constructor(private grupoRepo: IGrupoRepository) {}

  async execute(id: number, data: Partial<Grupo>): Promise<Grupo | null> {
    return await this.grupoRepo.update(id, data);
  }
}
