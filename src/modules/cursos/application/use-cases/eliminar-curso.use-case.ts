import { ICursoRepository } from '../../domain/repositories/curso.repository';

export class EliminarCursoUseCase {
  constructor(private cursoRepo: ICursoRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.cursoRepo.delete(id);
  }
}
