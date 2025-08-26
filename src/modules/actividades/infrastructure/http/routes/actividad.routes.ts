import { Router } from 'express';
import { ActividadController } from '../controllers/actividad.controller';

const router = Router();

router.post('/crear', (req, res) => {
  console.log('✨ [ACTIVIDAD ROUTES] POST /crear - Creando actividad');
  console.log('Body:', req.body);
  ActividadController.crear(req, res);
});

router.post('/', (req, res) => {
  console.log('✨ [ACTIVIDAD ROUTES] POST / - Creando actividad (ruta alternativa)');
  console.log('Body:', req.body);
  ActividadController.crear(req, res);
});

router.get('/listar', (req, res) => {
  console.log('🔍 [ACTIVIDAD ROUTES] GET /listar - Listando todas las actividades');
  ActividadController.listar(req, res);
});

router.get('/', (req, res) => {
  console.log('🔍 [ACTIVIDAD ROUTES] GET / - Listando todas las actividades (ruta alternativa)');
  ActividadController.listar(req, res);
});

router.get('/unidad/:unidadId', (req, res) => {
  console.log('📚 [ACTIVIDAD ROUTES] GET /unidad/:unidadId - Listando actividades por unidad');
  console.log('ID de la unidad:', req.params.unidadId);
  ActividadController.listarPorUnidad(req, res);
});

router.put('/:id', (req, res) => {
  console.log('✏️ [ACTIVIDAD ROUTES] PUT /:id - Actualizando actividad');
  console.log('ID:', req.params.id);
  console.log('Body:', req.body);
  ActividadController.actualizar(req, res);
});

router.delete('/:id', (req, res) => {
  console.log('🗑️ [ACTIVIDAD ROUTES] DELETE /:id - Eliminando actividad');
  console.log('ID:', req.params.id);
  ActividadController.eliminar(req, res);
});

export default router;
