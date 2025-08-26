import { IMateriaRepository, Materia } from '../../infrastructure/persistence/repositories/typeorm-materia.repository';

export class CrearMateriaUseCase {
  constructor(private materiaRepo: IMateriaRepository) {}

  async execute(data: { nombre: string; num_cuatri: number }): Promise<Materia> {
    const materia = new Materia(0, data.nombre, data.num_cuatri);
    return await this.materiaRepo.create(materia);
  }
}
