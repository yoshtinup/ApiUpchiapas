import { IGrupoRepository, Grupo } from '../../infrastructure/persistence/repositories/typeorm-grupo.repository';

export class CrearGrupoUseCase {
  constructor(private grupoRepo: IGrupoRepository) {}

  async execute(data: { numero: number; materia_id: number }): Promise<Grupo> {
    const grupo = new Grupo(0, data.numero, data.materia_id);
    return await this.grupoRepo.create(grupo);
  }
}
