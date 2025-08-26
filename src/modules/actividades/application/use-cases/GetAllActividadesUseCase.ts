import { ActividadRepository } from '../../domain/repositories/ActividadRepository';
import { Actividad } from '../../domain/entities/actividad';

export class GetAllActividadesUseCase {
  constructor(private actividadRepository: ActividadRepository) {}

  async execute(): Promise<Actividad[]> {
    return await this.actividadRepository.findAll();
  }
}
