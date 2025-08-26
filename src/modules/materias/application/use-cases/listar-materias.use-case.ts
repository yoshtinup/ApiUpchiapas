import { IMateriaRepository, Materia } from '../../infrastructure/persistence/repositories/typeorm-materia.repository';

export class ListarMateriasUseCase {
  constructor(private materiaRepo: IMateriaRepository) {}

  async execute(): Promise<Materia[]> {
    return await this.materiaRepo.findAll();
  }
}
