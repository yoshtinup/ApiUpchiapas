# API Upchiapas

API REST desarrollada con arquitectura hexagonal y vertical slicing para la gestión de usuarios.

## 🚀 Características

- ✅ Arquitectura Hexagonal
- ✅ Vertical Slicing por módulos
- ✅ TypeScript
- ✅ Express.js
- ✅ TypeORM con MySQL
- ✅ Autenticación JWT
- ✅ Validación de datos
- ✅ Manejo de errores

## 📋 Endpoints Disponibles

### Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/usuarios/listar` | Obtener todos los usuarios |
| POST | `/usuarios/crear` | Crear un nuevo usuario |
| PUT | `/usuarios/:id` | Actualizar un usuario |
| DELETE | `/usuarios/:id` | Eliminar un usuario |
| POST | `/usuarios/login` | Iniciar sesión |
| POST | `/usuarios/recuperar-contrasena` | Recuperar contraseña |

### Salud del API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Verificar estado del API |

## 🛠️ Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   El archivo `.env` ya está configurado con:
   ```env
   DB_BASEUP_HOST=34.236.201.100
   DB_BASEUP_PORT=3306
   DB_BASEUP_USERNAME=Upchiapas
   DB_BASEUP_PASSWORD=Upchiapas
   DB_BASEUP_DATABASE=baseup
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   npm start
   ```

## 📁 Estructura del Proyecto

```
src/
├── shared/                          # Código compartido
│   ├── domain/
│   │   ├── entities/               # Entidades base
│   │   └── value-objects/          # Objetos de valor
│   └── infrastructure/
│       ├── config/                 # Configuración
│       └── database/               # Configuración BD
├── modules/
│   └── usuarios/                   # Módulo de usuarios
│       ├── domain/                 # Lógica de negocio
│       │   ├── entities/
│       │   └── repositories/
│       ├── application/            # Casos de uso
│       │   └── use-cases/
│       └── infrastructure/         # Adaptadores
│           ├── persistence/
│           └── http/
├── app.ts                         # Configuración de Express
└── server.ts                     # Punto de entrada
```

## 📝 Ejemplos de Uso

### Crear Usuario
```bash
POST /usuarios/crear
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "1234567890",
  "tipo": "admin",
  "password": "mi_password"
}
```

### Listar Usuarios
```bash
GET /usuarios/listar
```

### Login
```bash
POST /usuarios/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "mi_password"
}
```

### Actualizar Usuario
```bash
PUT /usuarios/1
Content-Type: application/json

{
  "nombre": "Juan Carlos Pérez",
  "telefono": "0987654321",
  "estado": true
}
```

## 🔧 Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo con nodemon
- `npm run build` - Construir el proyecto
- `npm start` - Ejecutar la versión construida
- `npm test` - Ejecutar pruebas

## 🌐 URL Base

La API se ejecuta en: `http://localhost:3000`

## 🏗️ Arquitectura

Este proyecto implementa:

- **Arquitectura Hexagonal**: Separación clara entre dominio, aplicación e infraestructura
- **Vertical Slicing**: Cada módulo contiene toda su funcionalidad
- **Domain-Driven Design**: El dominio es el centro de la aplicación
- **Dependency Inversion**: Las dependencias apuntan hacia el dominio

## 📊 Base de Datos

La API se conecta a una base de datos MySQL con la tabla `usuarios` que contiene:

- `id` (PK, AUTO_INCREMENT)
- `nombre` (VARCHAR 255)
- `email` (VARCHAR 255, UNIQUE)
- `telefono` (VARCHAR 20)
- `estado` (BOOLEAN, default TRUE)
- `tipo` (VARCHAR 50)
- `password` (VARCHAR 255, encriptado)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

## ⚠️ Notas Importantes

- Las contraseñas se encriptan con bcrypt
- Los tokens JWT tienen una duración de 24 horas
- Los usuarios inactivos no pueden iniciar sesión
- Si no se especifica password, se usa el tipo como password por defecto