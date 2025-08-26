import { ActividadRepository } from '../../domain/repositories/ActividadRepository';
import { Actividad } from '../../domain/entities/actividad';

export class UpdateActividadUseCase {
  constructor(private actividadRepository: ActividadRepository) {}

  async execute(id: number, updateData: {
    nombre_actividad?: string;
    descripcion?: string;
    ponderacion?: number;
  }): Promise<Actividad | null> {
    const dataWithTimestamp = {
      ...updateData,
      updated_at: new Date()
    };
    
    return await this.actividadRepository.update(id, dataWithTimestamp);
  }
}
