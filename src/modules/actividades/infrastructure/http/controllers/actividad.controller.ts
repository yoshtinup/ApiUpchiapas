import { Request, Response } from 'express';
import { TypeORMActividadRepository } from '../../persistence/repositories/TypeORMActividadRepository';
import { CreateActividadUseCase } from '../../../application/use-cases/CreateActividadUseCase';
import { GetAllActividadesUseCase } from '../../../application/use-cases/GetAllActividadesUseCase';
import { GetActividadesByUnidadUseCase } from '../../../application/use-cases/GetActividadesByUnidadUseCase';
import { UpdateActividadUseCase } from '../../../application/use-cases/UpdateActividadUseCase';
import { DeleteActividadUseCase } from '../../../application/use-cases/DeleteActividadUseCase';

const actividadRepo = new TypeORMActividadRepository();

export class ActividadController {
  static async crear(req: Request, res: Response) {
    try {
      console.log('📝 [ACTIVIDAD] POST /crear - Creando nueva actividad');
      console.log('📦 [ACTIVIDAD] Datos recibidos:', req.body);
      
      // Validar que los datos requeridos estén presentes
      const { unidad_id, nombre_actividad, descripcion, ponderacion } = req.body;
      
      if (!unidad_id || !nombre_actividad || ponderacion === undefined) {
        console.log('❌ [ACTIVIDAD] Datos faltantes en la petición');
        return res.status(400).json({ 
          error: 'Datos requeridos: unidad_id, nombre_actividad, ponderacion' 
        });
      }

      // Validar que la ponderación esté en un rango válido (DECIMAL(5,4) permite 0.0000 a 9.9999)
      const ponderacionNum = parseFloat(ponderacion.toString());
      if (isNaN(ponderacionNum) || ponderacionNum < 0 || ponderacionNum > 9.9999) {
        console.log('❌ [ACTIVIDAD] Ponderación fuera de rango válido (0.0000-9.9999)');
        return res.status(400).json({ 
          error: 'La ponderación debe ser un número decimal entre 0.0000 y 9.9999' 
        });
      }
      
      const useCase = new CreateActividadUseCase(actividadRepo);
      const actividad = await useCase.execute({
        unidad_id: Number(unidad_id), // Convertir a número
        nombre_actividad,
        descripcion: descripcion || '',
        ponderacion: ponderacionNum // Usar la variable validada
      });
      
      console.log('✅ [ACTIVIDAD] Actividad creada exitosamente:', actividad);
      res.status(201).json(actividad);
    } catch (err) {
      console.error('💥 [ACTIVIDAD] Error al crear actividad:', err);
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      console.log('📋 [ACTIVIDAD] GET /listar - Listando todas las actividades');
      
      const useCase = new GetAllActividadesUseCase(actividadRepo);
      const actividades = await useCase.execute();
      
      console.log(`✅ [ACTIVIDAD] Se encontraron ${actividades.length} actividades`);
      res.json(actividades);
    } catch (err) {
      console.error('💥 [ACTIVIDAD] Error al listar actividades:', err);
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async listarPorUnidad(req: Request, res: Response) {
    try {
      const unidadId = Number(req.params.unidadId); // Convertir a número
      console.log(`📋 [ACTIVIDAD] GET /unidad/${unidadId} - Listando actividades de la unidad ${unidadId}`);
      
      const useCase = new GetActividadesByUnidadUseCase(actividadRepo);
      const actividades = await useCase.execute(unidadId);
      
      console.log(`✅ [ACTIVIDAD] Se encontraron ${actividades.length} actividades para la unidad ${unidadId}`);
      res.json(actividades);
    } catch (err) {
      console.error('💥 [ACTIVIDAD] Error al listar actividades por unidad:', err);
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async actualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      console.log(`🔄 [ACTIVIDAD] PUT /${id} - Actualizando actividad ${id}`);
      console.log('📦 [ACTIVIDAD] Datos de actualización:', req.body);
      
      const useCase = new UpdateActividadUseCase(actividadRepo);
      const actividad = await useCase.execute(id, req.body);
      
      if (!actividad) {
        console.log(`❌ [ACTIVIDAD] Actividad ${id} no encontrada`);
        return res.status(404).json({ error: 'Actividad no encontrada' });
      }
      
      console.log('✅ [ACTIVIDAD] Actividad actualizada exitosamente:', actividad);
      res.json(actividad);
    } catch (err) {
      console.error('💥 [ACTIVIDAD] Error al actualizar actividad:', err);
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async eliminar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      console.log(`🗑️ [ACTIVIDAD] DELETE /${id} - Eliminando actividad ${id}`);
      
      const useCase = new DeleteActividadUseCase(actividadRepo);
      const eliminado = await useCase.execute(id);
      
      if (!eliminado) {
        console.log(`❌ [ACTIVIDAD] Actividad ${id} no encontrada`);
        return res.status(404).json({ error: 'Actividad no encontrada' });
      }
      
      console.log(`✅ [ACTIVIDAD] Actividad ${id} eliminada exitosamente`);
      res.json({ success: true, message: 'Actividad eliminada exitosamente' });
    } catch (err) {
      console.error('💥 [ACTIVIDAD] Error al eliminar actividad:', err);
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }
}
