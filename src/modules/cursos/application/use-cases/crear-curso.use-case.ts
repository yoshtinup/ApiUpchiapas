import { ICursoRepository, Curso } from '../../infrastructure/persistence/repositories/typeorm-curso.repository';

export class CrearCursoUseCase {
  constructor(private cursoRepo: ICursoRepository) {}

  async execute(data: { materia_id: number; grupo_id: number; profesor_usuario_id: number }): Promise<Curso> {
    const curso = new Curso(0, data.materia_id, data.grupo_id, data.profesor_usuario_id);
    return await this.cursoRepo.create(curso);
  }
}
