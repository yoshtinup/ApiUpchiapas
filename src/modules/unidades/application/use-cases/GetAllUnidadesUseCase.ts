import { UnidadRepository } from '../../domain/repositories/UnidadRepository';
import { Unidad } from '../../domain/entities/unidad';

export class GetAllUnidadesUseCase {
  constructor(private unidadRepository: UnidadRepository) {}

  async execute(): Promise<Unidad[]> {
    return await this.unidadRepository.findAll();
  }
}
