import { UnidadRepository } from '../../domain/repositories/UnidadRepository';
import { Unidad } from '../../domain/entities/unidad';

export class UpdateUnidadUseCase {
  constructor(private unidadRepository: UnidadRepository) {}

  async execute(id: number, updateData: {
    numero_unidad?: number;
    nombre_unidad?: string;
    descripcion?: string;
  }): Promise<Unidad | null> {
    return await this.unidadRepository.update(id, updateData);
  }
}
