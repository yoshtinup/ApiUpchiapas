import { Request, Response } from 'express';
import { TypeOrmCursoRepository } from '../../persistence/repositories/typeorm-curso.repository';
import { CrearCursoUseCase } from '../../../application/use-cases/crear-curso.use-case';
import { ListarCursosUseCase } from '../../../application/use-cases/listar-cursos.use-case';
import { ListarCursosPorProfesorUseCase } from '../../../application/use-cases/listar-cursos-por-profesor.use-case';
import { ActualizarCursoUseCase } from '../../../application/use-cases/actualizar-curso.use-case';
import { EliminarCursoUseCase } from '../../../application/use-cases/eliminar-curso.use-case';

const cursoRepo = new TypeOrmCursoRepository();

export class CursoController {
  static async crear(req: Request, res: Response) {
    try {
      const useCase = new CrearCursoUseCase(cursoRepo);
      // Mapear asignatura_id a materia_id para compatibilidad con frontend
      const cursoData = {
        materia_id: req.body.asignatura_id || req.body.materia_id,
        grupo_id: req.body.grupo_id,
        profesor_usuario_id: req.body.profesor_usuario_id
      };
      const curso = await useCase.execute(cursoData);
      res.status(201).json(curso);
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const useCase = new ListarCursosUseCase(cursoRepo);
      const cursos = await useCase.execute();
      res.json(cursos);
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async listarPorProfesor(req: Request, res: Response) {
    try {
      const profesorId = Number(req.params.profesorId);
      const useCase = new ListarCursosPorProfesorUseCase(cursoRepo);
      const cursos = await useCase.execute(profesorId);
      res.json(cursos);
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async actualizar(req: Request, res: Response) {
    try {
      const useCase = new ActualizarCursoUseCase(cursoRepo);
      const curso = await useCase.execute(Number(req.params.id), req.body);
      if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });
      res.json(curso);
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async eliminar(req: Request, res: Response) {
    try {
      const useCase = new EliminarCursoUseCase(cursoRepo);
      const ok = await useCase.execute(Number(req.params.id));
      if (!ok) return res.status(404).json({ error: 'Curso no encontrado' });
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }
}
