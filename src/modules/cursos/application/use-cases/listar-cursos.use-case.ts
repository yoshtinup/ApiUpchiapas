import { ICursoRepository } from '../../domain/repositories/curso.repository';
import { Curso } from '../../domain/entities/curso';

export class ListarCursosUseCase {
  constructor(private cursoRepo: ICursoRepository) {}

  async execute(): Promise<Curso[]> {
    return await this.cursoRepo.findAll();
  }
}
