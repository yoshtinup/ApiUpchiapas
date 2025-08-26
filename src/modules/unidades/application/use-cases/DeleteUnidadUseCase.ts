import { UnidadRepository } from '../../domain/repositories/UnidadRepository';

export class DeleteUnidadUseCase {
  constructor(private unidadRepository: UnidadRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.unidadRepository.delete(id);
  }
}
