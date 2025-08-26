import { Router } from 'express';
import { GrupoController } from '../controllers/grupo.controller';

const router = Router();

router.post('/', (req, res) => {
  console.log('✨ [GRUPO ROUTES] POST / - Creando grupo');
  console.log('Body:', req.body);
  GrupoController.crear(req, res);
});

router.get('/', (req, res) => {
  console.log('🔍 [GRUPO ROUTES] GET / - Listando grupos');
  console.log('Query params:', req.query);
  GrupoController.listar(req, res);
});

router.put('/:id', (req, res) => {
  console.log('✏️ [GRUPO ROUTES] PUT /:id - Actualizando grupo');
  console.log('ID:', req.params.id);
  console.log('Body:', req.body);
  GrupoController.actualizar(req, res);
});

router.delete('/:id', (req, res) => {
  console.log('🗑️ [GRUPO ROUTES] DELETE /:id - Eliminando grupo');
  console.log('ID:', req.params.id);
  GrupoController.eliminar(req, res);
});

export default router;
