import { ActividadRepository } from '../../domain/repositories/ActividadRepository';
import { Actividad } from '../../domain/entities/actividad';

export class CreateActividadUseCase {
  constructor(private actividadRepository: ActividadRepository) {}

  async execute(actividadData: {
    unidad_id: number; // Cambiado de string a number
    nombre_actividad: string;
    descripcion: string;
    ponderacion: number;
  }): Promise<Actividad> {
    const now = new Date();
    const actividad = new Actividad(
      0, // El ID será asignado por la base de datos
      actividadData.unidad_id,
      actividadData.nombre_actividad,
      actividadData.descripcion,
      actividadData.ponderacion,
      now, // created_at
      now  // updated_at
    );

    return await this.actividadRepository.create(actividad);
  }
}
