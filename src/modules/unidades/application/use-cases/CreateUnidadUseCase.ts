import { UnidadRepository } from '../../domain/repositories/UnidadRepository';
import { Unidad } from '../../domain/entities/unidad';

export class CreateUnidadUseCase {
  constructor(private unidadRepository: UnidadRepository) {}

  async execute(unidadData: {
    curso_id: number;
    numero_unidad: number;
    nombre_unidad: string;
    descripcion: string;
  }): Promise<Unidad> {
    const unidad = new Unidad(
      0, // El ID será asignado por la base de datos
      unidadData.curso_id,
      unidadData.numero_unidad,
      unidadData.nombre_unidad,
      unidadData.descripcion
    );

    return await this.unidadRepository.create(unidad);
  }
}
