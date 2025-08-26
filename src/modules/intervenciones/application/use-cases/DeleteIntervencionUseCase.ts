import { IntervencionRepository } from '../../domain/repositories/IntervencionRepository';

export class DeleteIntervencionUseCase {
  constructor(private repo: IntervencionRepository) {}
  async execute(id: number): Promise<boolean> {
    return this.repo.delete(id);
  }
}
