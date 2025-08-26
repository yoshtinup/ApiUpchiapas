import { IntervencionRepository } from '../../domain/repositories/IntervencionRepository';
import { Intervencion } from '../../domain/entities/intervencion';

export class GetIntervencionesByTutorUseCase {
  constructor(private repo: IntervencionRepository) {}
  async execute(tutor_id: number): Promise<Intervencion[]> {
    return this.repo.findByTutorId(tutor_id);
  }
}