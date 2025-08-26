import { Request, Response } from 'express';
import { TypeOrmMateriaRepository } from '../../persistence/repositories/typeorm-materia.repository';
import { CrearMateriaUseCase } from '../../../application/use-cases/crear-materia.use-case';
import { ListarMateriasUseCase } from '../../../application/use-cases/listar-materias.use-case';
import { ActualizarMateriaUseCase } from '../../../application/use-cases/actualizar-materia.use-case';
import { EliminarMateriaUseCase } from '../../../application/use-cases/eliminar-materia.use-case';

const materiaRepo = new TypeOrmMateriaRepository();

export class MateriaController {
  static async crear(req: Request, res: Response) {
    try {
      const useCase = new CrearMateriaUseCase(materiaRepo);
      const materia = await useCase.execute(req.body);
      res.status(201).json({ success: true, data: materia });
    } catch (err) {
      res.status(400).json({ success: false, error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const useCase = new ListarMateriasUseCase(materiaRepo);
      const materias = await useCase.execute();
      res.json({ success: true, data: materias });
    } catch (err) {
      res.status(400).json({ success: false, error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async buscar(req: Request, res: Response) {
    try {
      const { nombre, num_cuatri } = req.body;
      const useCase = new ListarMateriasUseCase(materiaRepo);
      let materias = await useCase.execute();
      
      // Filtrar por nombre si se proporciona
      if (nombre) {
        materias = materias.filter(m => 
          m.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
      }
      
      // Filtrar por cuatrimestre si se proporciona
      if (num_cuatri !== undefined) {
        materias = materias.filter(m => m.num_cuatri === num_cuatri);
      }
      
      res.json({ success: true, data: materias });
    } catch (err) {
      res.status(400).json({ success: false, error: err instanceof Error ? err.message : String(err) });
    }
  }
  static async buscarMultiple(req: Request, res: Response) {
    try {
      const ids: number[] = req.body.asignatura_ids || [];
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ success: false, error: 'No se proporcionaron IDs válidos' });
      }
      const useCase = new ListarMateriasUseCase(materiaRepo);
      const materias = await useCase.execute();
      const filtradas = materias.filter(m => ids.includes(m.id));
      res.json({ success: true, data: filtradas });
    } catch (err) {
      res.status(400).json({ success: false, error: err instanceof Error ? err.message : String(err) });
    }
  }
  static async obtenerPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const useCase = new ListarMateriasUseCase(materiaRepo);
      const materias = await useCase.execute();
      const materia = materias.find(m => m.id === id);
      if (!materia) return res.status(404).json({ success: false, error: 'Materia no encontrada' });
      res.json({ success: true, data: materia });
    } catch (err) {
      res.status(400).json({ success: false, error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async actualizar(req: Request, res: Response) {
    try {
      const useCase = new ActualizarMateriaUseCase(materiaRepo);
      const materia = await useCase.execute(Number(req.params.id), req.body);
      if (!materia) return res.status(404).json({ success: false, error: 'Materia no encontrada' });
      res.json({ success: true, data: materia });
    } catch (err) {
      res.status(400).json({ success: false, error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async eliminar(req: Request, res: Response) {
    try {
      const useCase = new EliminarMateriaUseCase(materiaRepo);
      const ok = await useCase.execute(Number(req.params.id));
      if (!ok) return res.status(404).json({ success: false, error: 'Materia no encontrada' });
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false, error: err instanceof Error ? err.message : String(err) });
    }
  }
}
