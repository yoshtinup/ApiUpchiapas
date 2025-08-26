import { IGrupoRepository } from '../../domain/repositories/grupo.repository';

export class EliminarGrupoUseCase {
  constructor(private grupoRepo: IGrupoRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.grupoRepo.delete(id);
  }
}
