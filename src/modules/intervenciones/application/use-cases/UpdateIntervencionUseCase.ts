import { IntervencionRepository } from '../../domain/repositories/IntervencionRepository';
import { Intervencion } from '../../domain/entities/intervencion';

export class UpdateIntervencionUseCase {
  constructor(private repo: IntervencionRepository) {}
  async execute(id: number, data: Partial<Omit<Intervencion, 'id'>>): Promise<Intervencion | null> {
    return this.repo.update(id, data);
  }
}
