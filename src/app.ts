import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './shared/infrastructure/database/database.config';

const app = express();

app.use(cors());
app.use(express.json());

// Middleware global para logging de peticiones
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`\n🌐 [${timestamp}] ${req.method} ${req.url}`);
  console.log('📍 [HEADERS]:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('📦 [BODY]:', req.body);
  }
  if (req.query && Object.keys(req.query).length > 0) {
    console.log('🔍 [QUERY]:', req.query);
  }
  console.log('-------------------------------------------');
  next();
});

// Ruta de prueba
app.get('/health', (req, res) => {
  console.log('💚 [HEALTH CHECK] GET /health - Verificando estado de la API');
  res.json({ message: 'API funcionando correctamente', timestamp: new Date().toISOString() });
});

// Función para inicializar las rutas después de conectar la base de datos
const initializeRoutes = () => {
  console.log('🚀 [APP] Iniciando configuración de rutas...');
  
  // Importar rutas dinámicamente después de la conexión
  const usuarioRoutes = require('./modules/usuarios/infrastructure/http/routes/usuario.routes').default;
  const materiaRoutes = require('./modules/materias/infrastructure/http/routes/materia.routes').default;
  const grupoRoutes = require('./modules/grupos/infrastructure/http/routes/grupo.routes').default;
  const cursoRoutes = require('./modules/cursos/infrastructure/http/routes/curso.routes').default;
  const unidadRoutes = require('./modules/unidades/infrastructure/http/routes/unidad.routes').default;
  const actividadRoutes = require('./modules/actividades/infrastructure/http/routes/actividad.routes').default;
  const intervencionRoutes = require('./modules/intervenciones/infrastructure/http/routes/intervencion.routes').default;

  // Registrar rutas
  console.log('📝 [APP] Registrando ruta: /usuarios');
  app.use('/usuarios', usuarioRoutes);
  
  console.log('📚 [APP] Registrando ruta: /materias');
  app.use('/materias', materiaRoutes);
  
  console.log('👥 [APP] Registrando ruta: /grupos');
  app.use('/grupos', grupoRoutes);
  
  console.log('🎓 [APP] Registrando ruta: /cursos');
  app.use('/cursos', cursoRoutes);
  
  console.log('📋 [APP] Registrando ruta: /unidades');
  app.use('/unidades/unidades', unidadRoutes);
  
  console.log('📝 [APP] Registrando ruta: /actividades');
  app.use('/actividades/actividades', actividadRoutes);
  
  console.log('🆘 [APP] Registrando ruta: /intervenciones');
  app.use('/api/intervenciones', intervencionRoutes);
  
  console.log('📚 [APP] Registrando ruta alternativa: /api/materias');
  app.use('/api/materias', materiaRoutes);
  
  console.log('📚 [APP] Registrando alias: /api/asignaturas');
  app.use('/api/asignaturas', materiaRoutes); // Alias para asignaturas
  
  console.log('👥 [APP] Registrando ruta alternativa: /api/grupos');
  app.use('/api/grupos', grupoRoutes);
  
  console.log('🎓 [APP] Registrando ruta alternativa: /api/cursos');
  app.use('/api/cursos', cursoRoutes);
  
  console.log('📋 [APP] Registrando ruta alternativa: /api/unidades');
  app.use('/api/unidades', unidadRoutes);
  
  console.log('📝 [APP] Registrando ruta alternativa: /api/actividades');
  app.use('/api/actividades', actividadRoutes);
  
  console.log('🆘 [APP] Registrando ruta alternativa: /api/intervenciones');
  app.use('/api/intervenciones', intervencionRoutes);
  
  console.log('🎓 [APP] Registrando ruta de compatibilidad: /curso/cursos');
  app.use('/curso/cursos', cursoRoutes); // Ruta adicional para compatibilidad con frontend
  
  console.log('✅ [APP] Todas las rutas han sido registradas exitosamente');
  
  // Middleware para manejar rutas no encontradas
  app.use('*', (req, res) => {
    console.log(`❌ [404] Ruta no encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ 
      error: 'Ruta no encontrada', 
      method: req.method, 
      url: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  });
  
  // Middleware global para manejo de errores
  app.use((error: any, req: any, res: any, next: any) => {
    console.log(`💥 [ERROR] ${req.method} ${req.url}`);
    console.log('Error details:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor', 
      message: error.message,
      timestamp: new Date().toISOString()
    });
  });
};

// Inicializar conexión a la base de datos
export const initializeApp = async () => {
  try {
    console.log('🔌 [DATABASE] Conectando a la base de datos...');
    await AppDataSource.initialize();
    console.log('✅ [DATABASE] Base de datos conectada exitosamente');
    
    console.log('🛣️ [ROUTES] Inicializando rutas...');
    initializeRoutes();
    console.log('✅ [ROUTES] Rutas inicializadas exitosamente');
    
    console.log('🚀 [APP] Aplicación inicializada correctamente');
  } catch (error) {
    console.error('💥 [ERROR] Error al inicializar la aplicación:', error);
    throw error;
  }
};

export default app;
