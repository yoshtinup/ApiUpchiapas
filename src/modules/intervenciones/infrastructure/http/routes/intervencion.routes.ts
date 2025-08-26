import { Router } from 'express';
import { IntervencionController } from '../controllers/intervencion.controller';

const router = Router();

router.get('/tutor/:tutor_id', (req, res) => {
  console.log('🔎 [INTERVENCIONES] GET /tutor/:tutor_id - Listar por tutor');
  IntervencionController.listarPorTutor(req, res);
});

router.post('/', (req, res) => {
  console.log('✨ [INTERVENCIONES] POST / - Crear intervención');
  IntervencionController.crear(req, res);
});

router.get('/', (req, res) => {
  console.log('🔍 [INTERVENCIONES] GET / - Listar intervenciones');
  IntervencionController.listar(req, res);
});


router.put('/:id', (req, res) => {
  console.log('✏️ [INTERVENCIONES] PUT /:id - Actualizar intervención');
  IntervencionController.actualizar(req, res);
});

router.delete('/:id', (req, res) => {
  console.log('🗑️ [INTERVENCIONES] DELETE /:id - Eliminar intervención');
  IntervencionController.eliminar(req, res);
});

export default router;
