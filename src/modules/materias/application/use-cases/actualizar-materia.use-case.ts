import { IMateriaRepository, Materia } from '../../infrastructure/persistence/repositories/typeorm-materia.repository';

export class ActualizarMateriaUseCase {
  constructor(private materiaRepo: IMateriaRepository) {}

  async execute(id: number, data: Partial<Materia>): Promise<Materia | null> {
    return await this.materiaRepo.update(id, data);
  }
}
