import { UnidadRepository } from '../../domain/repositories/UnidadRepository';
import { Unidad } from '../../domain/entities/unidad';
import { ActividadRepository } from '../../../actividades/domain/repositories/ActividadRepository';

export interface ActividadDTO {
  id: number;
  nombre_actividad: string;
  descripcion: string;
  ponderacion: number;
}

export interface UnidadConActividades extends Unidad {
  actividades: ActividadDTO[];
}

export class GetUnidadesConActividadesByCursoUseCase {
  constructor(
    private unidadRepository: UnidadRepository,
    private actividadRepository: ActividadRepository
  ) {}

  async execute(cursoId: number): Promise<UnidadConActividades[]> {
    // Obtener unidades por curso
    const unidades = await this.unidadRepository.findByCursoId(cursoId);
    
    // Para cada unidad, obtener sus actividades
    const unidadesConActividades: UnidadConActividades[] = [];
    
    for (const unidad of unidades) {
      const actividades = await this.actividadRepository.findByUnidadId(unidad.id);
      
      const unidadConActividades: UnidadConActividades = {
        ...unidad,
        actividades: actividades.map(actividad => ({
          id: actividad.id,
          nombre_actividad: actividad.nombre_actividad,
          descripcion: actividad.descripcion,
          ponderacion: actividad.ponderacion
        }))
      };
      
      unidadesConActividades.push(unidadConActividades);
    }
    
    return unidadesConActividades;
  }
}
