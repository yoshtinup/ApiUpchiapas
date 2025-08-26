import { IntervencionRepository } from '../../domain/repositories/IntervencionRepository';
import { Intervencion } from '../../domain/entities/intervencion';

type CreateDTO = Omit<Intervencion, 'id'>;

export class CreateIntervencionUseCase {
  constructor(private repo: IntervencionRepository) {}

  async execute(input: CreateDTO): Promise<Intervencion> {
    return this.repo.create(input);
  }
}
