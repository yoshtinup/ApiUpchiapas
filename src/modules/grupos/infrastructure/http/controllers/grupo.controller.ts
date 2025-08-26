import { Request, Response } from 'express';
import { TypeOrmGrupoRepository } from '../../persistence/repositories/typeorm-grupo.repository';
import { CrearGrupoUseCase } from '../../../application/use-cases/crear-grupo.use-case';
import { ListarGruposUseCase } from '../../../application/use-cases/listar-grupos.use-case';
import { ActualizarGrupoUseCase } from '../../../application/use-cases/actualizar-grupo.use-case';
import { EliminarGrupoUseCase } from '../../../application/use-cases/eliminar-grupo.use-case';

const grupoRepo = new TypeOrmGrupoRepository();

export class GrupoController {
  static async crear(req: Request, res: Response) {
    try {
      const useCase = new CrearGrupoUseCase(grupoRepo);
      const grupo = await useCase.execute(req.body);
      res.status(201).json(grupo);
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const useCase = new ListarGruposUseCase(grupoRepo);
      const grupos = await useCase.execute();
      res.json(grupos);
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async actualizar(req: Request, res: Response) {
    try {
      const useCase = new ActualizarGrupoUseCase(grupoRepo);
      const grupo = await useCase.execute(Number(req.params.id), req.body);
      if (!grupo) return res.status(404).json({ error: 'Grupo no encontrado' });
      res.json(grupo);
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  static async eliminar(req: Request, res: Response) {
    try {
      const useCase = new EliminarGrupoUseCase(grupoRepo);
      const ok = await useCase.execute(Number(req.params.id));
      if (!ok) return res.status(404).json({ error: 'Grupo no encontrado' });
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : String(err) });
    }
  }
}
