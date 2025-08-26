import { Router } from 'express';
import { UnidadController } from '../controllers/unidad.controller';

const router = Router();

router.post('/crear', (req, res) => {
  console.log('✨ [UNIDAD ROUTES] POST /crear - Creando unidad');
  console.log('Body:', req.body);
  UnidadController.crear(req, res);
});

router.post('/', (req, res) => {
  console.log('✨ [UNIDAD ROUTES] POST / - Creando unidad (ruta alternativa)');
  console.log('Body:', req.body);
  UnidadController.crear(req, res);
});

router.get('/listar', (req, res) => {
  console.log('🔍 [UNIDAD ROUTES] GET /listar - Listando todas las unidades');
  UnidadController.listar(req, res);
});

router.get('/', (req, res) => {
  console.log('🔍 [UNIDAD ROUTES] GET / - Listando todas las unidades (ruta alternativa)');
  UnidadController.listar(req, res);
});

router.get('/curso/:cursoId/con-actividades', (req, res) => {
  console.log('📚 [UNIDAD ROUTES] GET /curso/:cursoId/con-actividades - Listando unidades por curso con actividades');
  console.log('ID del curso:', req.params.cursoId);
  UnidadController.listarPorCursoConActividades(req, res);
});

router.get('/curso/:cursoId', (req, res) => {
  console.log('📚 [UNIDAD ROUTES] GET /curso/:cursoId - Listando unidades por curso');
  console.log('ID del curso:', req.params.cursoId);
  UnidadController.listarPorCurso(req, res);
});

router.put('/:id', (req, res) => {
  console.log('✏️ [UNIDAD ROUTES] PUT /:id - Actualizando unidad');
  console.log('ID:', req.params.id);
  console.log('Body:', req.body);
  UnidadController.actualizar(req, res);
});

router.delete('/:id', (req, res) => {
  console.log('🗑️ [UNIDAD ROUTES] DELETE /:id - Eliminando unidad');
  console.log('ID:', req.params.id);
  UnidadController.eliminar(req, res);
});

export default router;
