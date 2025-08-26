import { IGrupoRepository } from '../../domain/repositories/grupo.repository';
import { Grupo } from '../../domain/entities/grupo';

export class ListarGruposUseCase {
  constructor(private grupoRepo: IGrupoRepository) {}

  async execute(): Promise<Grupo[]> {
    return await this.grupoRepo.findAll();
  }
}
