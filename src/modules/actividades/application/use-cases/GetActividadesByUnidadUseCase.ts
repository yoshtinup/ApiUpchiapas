import { ActividadRepository } from '../../domain/repositories/ActividadRepository';
import { Actividad } from '../../domain/entities/actividad';

export class GetActividadesByUnidadUseCase {
  constructor(private actividadRepository: ActividadRepository) {}

  async execute(unidadId: number): Promise<Actividad[]> { // Cambiado de string a number
    return await this.actividadRepository.findByUnidadId(unidadId);
  }
}
