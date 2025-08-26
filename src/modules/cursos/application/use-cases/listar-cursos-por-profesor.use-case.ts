import { ICursoRepository } from '../../domain/repositories/curso.repository';
import { Curso } from '../../domain/entities/curso';

export class ListarCursosPorProfesorUseCase {
  constructor(private cursoRepo: ICursoRepository) {}

  async execute(profesorId: number): Promise<Curso[]> {
    if (!profesorId || profesorId <= 0) {
      throw new Error('ID del profesor es requerido y debe ser un número válido');
    }
    
    return await this.cursoRepo.findByProfesorId(profesorId);
  }
}
