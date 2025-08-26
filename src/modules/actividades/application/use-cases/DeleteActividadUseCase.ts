import { ActividadRepository } from '../../domain/repositories/ActividadRepository';

export class DeleteActividadUseCase {
  constructor(private actividadRepository: ActividadRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.actividadRepository.delete(id);
  }
}
