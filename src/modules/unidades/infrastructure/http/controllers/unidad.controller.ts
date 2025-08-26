import { Request, Response } from 'express';
import { TypeORMUnidadRepository } from '../../persistence/repositories/TypeORMUnidadRepository';
import { CreateUnidadUseCase } from '../../../application/use-cases/CreateUnidadUseCase';
import { GetAllUnidadesUseCase } from '../../../application/use-cases/GetAllUnidadesUseCase';
import { GetUnidadesByCursoUseCase } from '../../../application/use-cases/GetUnidadesByCursoUseCase';
import { GetUnidadesConActividadesByCursoUseCase } from '../../../application/use-cases/GetUnidadesConActividadesByCursoUseCase';
import { UpdateUnidadUseCase } from '../../../application/use-cases/UpdateUnidadUseCase';
import { DeleteUnidadUseCase } from '../../../application/use-cases/DeleteUnidadUseCase';
import { TypeORMActividadRepository } from '../../../../actividades/infrastructure/persistence/repositories/TypeORMActividadRepository';

const unidadRepo = new TypeORMUnidadRepository();
const actividadRepo = new TypeORMActividadRepository();

export class UnidadController {
  static async crear(req: Request, res: Response) {
    try {
      console.log('📝 [UNIDAD] POST /crear - Creando nueva unidad');
      console.log('📦 [UNIDAD] Datos recibidos:', req.body);
      
      const useCase = new CreateUnidadUseCase(unidadRepo);
      const unidad = await useCase.execute(req.body);
      
      console.log('✅ [UNIDAD] Unidad creada exitosamente:', unidad);
      res.status(201).json(unidad);
    } catch (err) {
      console.error('💥 [UNIDAD] Error al crear unidad:', err);
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      console.log('📋 [UNIDAD] GET /listar - Listando todas las unidades');
      
      const useCase = new GetAllUnidadesUseCase(unidadRepo);
      const unidades = await useCase.execute();
      
      console.log(`✅ [UNIDAD] Se encontraron ${unidades.length} unidades`);
      res.json(unidades);
    } catch (err) {
      console.error('💥 [UNIDAD] Error al listar unidades:', err);
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async listarPorCurso(req: Request, res: Response) {
    try {
      const cursoId = Number(req.params.cursoId);
      console.log(`📋 [UNIDAD] GET /curso/${cursoId} - Listando unidades del curso ${cursoId}`);
      
      const useCase = new GetUnidadesByCursoUseCase(unidadRepo);
      const unidades = await useCase.execute(cursoId);
      
      console.log(`✅ [UNIDAD] Se encontraron ${unidades.length} unidades para el curso ${cursoId}`);
      res.json(unidades);
    } catch (err) {
      console.error('💥 [UNIDAD] Error al listar unidades por curso:', err);
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async listarPorCursoConActividades(req: Request, res: Response) {
    try {
      const cursoId = Number(req.params.cursoId);
      console.log(`📋 [UNIDAD] GET /curso/${cursoId}/con-actividades - Listando unidades con actividades del curso ${cursoId}`);
      
      const useCase = new GetUnidadesConActividadesByCursoUseCase(unidadRepo, actividadRepo);
      const unidadesConActividades = await useCase.execute(cursoId);
      
      console.log(`✅ [UNIDAD] Se encontraron ${unidadesConActividades.length} unidades con actividades para el curso ${cursoId}`);
      res.json(unidadesConActividades);
    } catch (err) {
      console.error('💥 [UNIDAD] Error al listar unidades con actividades por curso:', err);
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async actualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      console.log(`🔄 [UNIDAD] PUT /${id} - Actualizando unidad ${id}`);
      console.log('📦 [UNIDAD] Datos de actualización:', req.body);
      
      const useCase = new UpdateUnidadUseCase(unidadRepo);
      const unidad = await useCase.execute(id, req.body);
      
      if (!unidad) {
        console.log(`❌ [UNIDAD] Unidad ${id} no encontrada`);
        return res.status(404).json({ error: 'Unidad no encontrada' });
      }
      
      console.log('✅ [UNIDAD] Unidad actualizada exitosamente:', unidad);
      res.json(unidad);
    } catch (err) {
      console.error('💥 [UNIDAD] Error al actualizar unidad:', err);
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async eliminar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      console.log(`🗑️ [UNIDAD] DELETE /${id} - Eliminando unidad ${id}`);
      
      const useCase = new DeleteUnidadUseCase(unidadRepo);
      const eliminado = await useCase.execute(id);
      
      if (!eliminado) {
        console.log(`❌ [UNIDAD] Unidad ${id} no encontrada`);
        return res.status(404).json({ error: 'Unidad no encontrada' });
      }
      
      console.log(`✅ [UNIDAD] Unidad ${id} eliminada exitosamente`);
      res.json({ success: true, message: 'Unidad eliminada exitosamente' });
    } catch (err) {
      console.error('💥 [UNIDAD] Error al eliminar unidad:', err);
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }
}
