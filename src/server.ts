import app, { initializeApp } from './app';
import { config } from './shared/infrastructure/config/environment.config';

const PORT = config.port;

// Inicializar la aplicación y luego el servidor
initializeApp()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
      console.log(`📚 API Documentación: http://localhost:${PORT}/health`);
    });
  })
  .catch((error) => {
    console.error('Error al inicializar la aplicación:', error);
    process.exit(1);
  });