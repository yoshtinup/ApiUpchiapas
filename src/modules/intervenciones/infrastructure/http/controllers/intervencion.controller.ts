import { Request, Response } from 'express';
import { TypeORMIntervencionRepository } from '../../persistence/repositories/TypeORMIntervencionRepository';
import { CreateIntervencionUseCase } from '../../../application/use-cases/CreateIntervencionUseCase';
import { GetAllIntervencionesUseCase } from '../../../application/use-cases/GetAllIntervencionesUseCase';
import { UpdateIntervencionUseCase } from '../../../application/use-cases/UpdateIntervencionUseCase';
import { DeleteIntervencionUseCase } from '../../../application/use-cases/DeleteIntervencionUseCase';
import { GetIntervencionesByTutorUseCase } from '../../../application/use-cases/GetIntervencionesByTutorUseCase';

const repo = new TypeORMIntervencionRepository();

export class IntervencionController {
  static async crear(req: Request, res: Response) {
    try {
      const { matricula_estudiante, materia_id, tutor_id, tipoDeIntervencion, descripcion } = req.body;
      if (
        matricula_estudiante === undefined ||
        materia_id === undefined ||
        tutor_id === undefined ||
        !tipoDeIntervencion
      ) {
        return res.status(400).json({
          error: 'Campos requeridos: matricula_estudiante, materia_id, tutor_id, tipoDeIntervencion',
        });
      }

      const useCase = new CreateIntervencionUseCase(repo);
      const created = await useCase.execute({
        matricula_estudiante: Number(matricula_estudiante),
        materia_id: Number(materia_id),
        tutor_id: Number(tutor_id),
        tipoDeIntervencion: String(tipoDeIntervencion),
        descripcion: descripcion ?? null,
        // id no se envía
      } as any);
      res.status(201).json({ success: true, data: created });
    } catch (err) {
      res.status(400).json({ success: false, error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const useCase = new GetAllIntervencionesUseCase(repo);
      const items = await useCase.execute();
      res.json({ success: true, data: items });
    } catch (err) {
      res.status(400).json({ success: false, error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async listarPorTutor(req: Request, res: Response) {
    try {
      const tutor_id = Number(req.params.tutor_id);
      if (Number.isNaN(tutor_id)) {
        return res.status(400).json({ success: false, error: 'tutor_id inválido' });
      }
      const useCase = new GetIntervencionesByTutorUseCase(repo);
      const items = await useCase.execute(tutor_id);

      const intervenciones = items.map((i) => ({
        id: i.id,
        matriculaEstudiante: String(i.matricula_estudiante),
        materiaId: i.materia_id,
        tipoDeIntervencion: i.tipoDeIntervencion,
        descripcion: i.descripcion,
        estado: null,           // si más adelante hay columna, mapearla aquí
        fechaCreacion: null,    // si hay created_at/fecha, mapearla aquí
      }));

      res.json({
        success: true,
        message: 'Intervenciones del tutor',
        data: {
          tutorId: String(tutor_id),
          intervenciones,
        },
      });
    } catch (err) {
      res.status(400).json({ success: false, error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async actualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const useCase = new UpdateIntervencionUseCase(repo);
      const updated = await useCase.execute(id, req.body);
      if (!updated) return res.status(404).json({ success: false, error: 'Intervención no encontrada' });
      res.json({ success: true, data: updated });
    } catch (err) {
      res.status(400).json({ success: false, error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async eliminar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const useCase = new DeleteIntervencionUseCase(repo);
      const ok = await useCase.execute(id);
      if (!ok) return res.status(404).json({ success: false, error: 'Intervención no encontrada' });
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false, error: err instanceof Error ? err.message : String(err) });
    }
  }
}
