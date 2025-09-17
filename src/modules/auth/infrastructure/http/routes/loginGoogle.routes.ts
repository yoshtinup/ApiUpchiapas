import { Router } from 'express';
import { LoginGoogleController } from '../controllers/loginGoogle.controller';

const router = Router();
const controller = new LoginGoogleController();

// Devuelve URL ( http://localhost:3002/auth/google/start ) para iniciar login con Google
router.get('/start', controller.start);

// Callback ( http://localhost:3002/auth/google/callback ) OAuth2 de Google
router.get('/callback', controller.callback);

//http://localhost:3002/auth/google/token  Verifica un ID Token enviado por el cliente (One Tap o Google Sign-In)
router.post('/token', controller.verifyToken);

export default router;
