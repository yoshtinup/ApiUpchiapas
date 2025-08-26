import { Router } from 'express';
import { MateriaController } from '../controllers/materia.controller';

const router = Router();


router.post('/', (req, res) => {
  console.log('✨ [MATERIA ROUTES] POST / - Creando materia');
  console.log('Body:', req.body);
  MateriaController.crear(req, res);
});

router.get('/', (req, res) => {
  console.log('🔍 [MATERIA ROUTES] GET / - Listando materias');
  console.log('Query params:', req.query);
  MateriaController.listar(req, res);
});

router.get('/listar', (req, res) => {
  console.log('🔍 [MATERIA ROUTES] GET /listar - Listando materias (ruta alternativa)');
  console.log('Query params:', req.query);
  MateriaController.listar(req, res);
});

router.post('/buscar', (req, res) => {
  console.log('🔎 [MATERIA ROUTES] POST /buscar - Buscando materia');
  console.log('Body:', req.body);
  MateriaController.buscar(req, res);
});

router.post('/buscar-multiple', (req, res) => {
  console.log('🔎 [MATERIA ROUTES] POST /buscar-multiple - Búsqueda múltiple de materias');
  console.log('Body:', req.body);
  MateriaController.buscarMultiple(req, res);
});

router.get('/:id', (req, res) => {
  console.log('🔍 [MATERIA ROUTES] GET /:id - Obteniendo materia por ID');
  console.log('ID:', req.params.id);
  MateriaController.obtenerPorId(req, res);
});

router.put('/:id', (req, res) => {
  console.log('✏️ [MATERIA ROUTES] PUT /:id - Actualizando materia');
  console.log('ID:', req.params.id);
  console.log('Body:', req.body);
  MateriaController.actualizar(req, res);
});

router.delete('/:id', (req, res) => {
  console.log('🗑️ [MATERIA ROUTES] DELETE /:id - Eliminando materia');
  console.log('ID:', req.params.id);
  MateriaController.eliminar(req, res);
});

export default router;
