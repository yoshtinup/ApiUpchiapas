import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller';

const router = Router();
const usuarioController = new UsuarioController();

router.get('/listar', (req, res) => {
  console.log('🔍 [USUARIO ROUTES] GET /listar - Listando usuarios');
  console.log('Query params:', req.query);
  usuarioController.listar(req, res);
});

router.get('/tutores', (req, res) => {
  console.log('👨‍🏫 [USUARIO ROUTES] GET /tutores - Listando tutores');
  usuarioController.listarTutores(req, res);
});

router.post('/crear', (req, res) => {
  console.log('✨ [USUARIO ROUTES] POST /crear - Creando usuario');
  console.log('Body:', req.body);
  usuarioController.crear(req, res);
});

router.put('/:id', (req, res) => {
  console.log('✏️ [USUARIO ROUTES] PUT /:id - Actualizando usuario');
  console.log('ID:', req.params.id);
  console.log('Body:', req.body);
  usuarioController.actualizar(req, res);
});

router.delete('/:id', (req, res) => {
  console.log('🗑️ [USUARIO ROUTES] DELETE /:id - Eliminando usuario');
  console.log('ID:', req.params.id);
  usuarioController.eliminar(req, res);
});

router.post('/login', (req, res) => {
  console.log('🔐 [USUARIO ROUTES] POST /login - Iniciando sesión');
  console.log('Body (email):', req.body.email ? req.body.email : 'No email provided');
  usuarioController.login(req, res);
});

router.post('/recuperar-contrasena', (req, res) => {
  console.log('🔑 [USUARIO ROUTES] POST /recuperar-contrasena - Recuperando contraseña');
  console.log('Body:', req.body);
  usuarioController.recuperarContrasena(req, res);
});

export default router;
