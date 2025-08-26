import { UnidadRepository } from '../../domain/repositories/UnidadRepository';
import { Unidad } from '../../domain/entities/unidad';

export class GetUnidadesByCursoUseCase {
  constructor(private unidadRepository: UnidadRepository) {}

  async execute(cursoId: number): Promise<Unidad[]> {
    return await this.unidadRepository.findByCursoId(cursoId);
  }
}
