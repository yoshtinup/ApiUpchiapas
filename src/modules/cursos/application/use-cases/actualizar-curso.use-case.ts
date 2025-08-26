import { ICursoRepository } from '../../domain/repositories/curso.repository';
import { Curso } from '../../domain/entities/curso';

export class ActualizarCursoUseCase {
  constructor(private cursoRepo: ICursoRepository) {}

  async execute(id: number, data: Partial<Curso>): Promise<Curso | null> {
    return await this.cursoRepo.update(id, data);
  }
}
