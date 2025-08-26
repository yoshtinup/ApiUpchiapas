import { Router } from 'express';
import { CursoController } from '../controllers/curso.controller';

const router = Router();

router.post('/', (req, res) => {
  console.log('✨ [CURSO ROUTES] POST / - Creando curso');
  console.log('Body:', req.body);
  CursoController.crear(req, res);
});

router.get('/', (req, res) => {
  console.log('🔍 [CURSO ROUTES] GET / - Listando cursos');
  console.log('Query params:', req.query);
  CursoController.listar(req, res);
});

router.get('/profesor/:profesorId', (req, res) => {
  console.log('👨‍🏫 [CURSO ROUTES] GET /profesor/:profesorId - Listando cursos por profesor');
  console.log('ID del profesor:', req.params.profesorId);
  CursoController.listarPorProfesor(req, res);
});

router.put('/:id', (req, res) => {
  console.log('✏️ [CURSO ROUTES] PUT /:id - Actualizando curso');
  console.log('ID:', req.params.id);
  console.log('Body:', req.body);
  CursoController.actualizar(req, res);
});

router.delete('/:id', (req, res) => {
  console.log('🗑️ [CURSO ROUTES] DELETE /:id - Eliminando curso');
  console.log('ID:', req.params.id);
  CursoController.eliminar(req, res);
});

export default router;
