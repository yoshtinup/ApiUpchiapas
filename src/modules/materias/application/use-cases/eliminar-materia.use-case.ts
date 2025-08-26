import { IMateriaRepository } from '../../infrastructure/persistence/repositories/typeorm-materia.repository';

export class EliminarMateriaUseCase {
  constructor(private materiaRepo: IMateriaRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.materiaRepo.delete(id);
  }
}
