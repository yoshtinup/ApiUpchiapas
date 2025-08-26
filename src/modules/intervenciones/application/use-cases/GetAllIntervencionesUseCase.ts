import { IntervencionRepository } from '../../domain/repositories/IntervencionRepository';
import { Intervencion } from '../../domain/entities/intervencion';

export class GetAllIntervencionesUseCase {
  constructor(private repo: IntervencionRepository) {}
  async execute(): Promise<Intervencion[]> {
    return this.repo.findAll();
  }
}
