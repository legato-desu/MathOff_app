# 🧠 MathOff App

Aplicación móvil desarrollada con **React Native (Expo)** y **Django REST Framework** orientada al aprendizaje matemático, resolución de ejercicios, graficación de funciones y autenticación segura mediante JWT.

La aplicación integra control de acceso basado en roles, persistencia de sesión, navegación protegida y comunicación en tiempo real con un backend desplegado en la nube.

---

# 🚀 Tecnologías utilizadas

## 📱 Frontend

- React Native (Expo)
- TypeScript
- Zustand (manejo de estado global)
- React Navigation
- AsyncStorage
- Expo Camera
- Expo Vector Icons

---

## 🖥️ Backend

- Python
- Django
- Django REST Framework
- SimpleJWT
- PostgreSQL
- CORS Headers

---

## ☁️ Infraestructura y Deploy

- Render (Backend + PostgreSQL)
- PostgreSQL Cloud Database
- GitHub

---

# 🔐 Sistema de autenticación y autorización

La aplicación implementa un sistema completo de autenticación basado en JWT (JSON Web Tokens).

## Características implementadas

- Login mediante credenciales
- Registro de usuarios
- Recepción de Access Token y Refresh Token
- Persistencia de sesión con AsyncStorage
- Manejo de estado global con Zustand
- Renovación automática de tokens (Refresh Token)
- Logout seguro
- Protección de rutas restringidas
- Control de acceso basado en roles
- Middleware JWT en backend
- Guards de navegación en frontend

---

# 👥 Roles del sistema

El sistema cuenta con autorización basada en roles almacenados en la base de datos.

## Roles disponibles

- Administrador
- Docente
- Estudiante

Cada rol posee acceso diferenciado dentro de la aplicación.

---

# 🔐 Protección de vistas

Las vistas protegidas validan:

- Estado de autenticación
- Token válido
- Permisos según rol
- Persistencia de sesión

---

# 📚 Funcionalidades principales

## 📖 Académicas

- Biblioteca de contenido matemático
- Graficador de funciones
- Escaneo de ecuaciones
- Resolución de ejercicios
- Gestión de respuestas

---

## 👤 Usuario

- Registro de usuarios
- Inicio de sesión
- Cambio de contraseña
- Persistencia automática de sesión
- Perfil dinámico según rol

---

## 👑 Administración

- Gestión de usuarios
- Gestión de roles
- Reportes
- Control administrativo

---

# 🧠 Flujo de autenticación

```text
Usuario inicia sesión
→ Backend valida credenciales
→ Django genera JWT
→ Frontend recibe tokens
→ Zustand almacena sesión
→ AsyncStorage persiste datos
→ Navegación protegida habilitada
```
---

# 🔄 Persistencia de sesión

La sesión permanece activa incluso al cerrar la aplicación.

Implementación
AsyncStorage para almacenamiento local
Zustand Persist Middleware
Recuperación automática de sesión
Validación de token JWT
Renovación automática mediante Refresh Token

---

⚠️ Manejo de errores implementado
Backend
401 Unauthorized
403 Forbidden
Validación JWT
Middleware de autenticación
Frontend
Logout automático por token inválido
Redirección a login
Mensajes de error controlados

---

## 📁 Estructura del proyecto

```

MathOff_app/

├── backend/
│   ├── config/
│   ├── ejercicios/
│   ├── reportes/
│   ├── respuestas/
│   ├── roles/
│   ├── tareas/
│   └── users/
│
└── frontend/
    ├── assets/
    ├── src/
    │   ├── components/
    │   ├── navigation/
    │   ├── screens/
    │   ├── servicios/
    │   ├── store/
    │   ├── styles/
    │   └── theme/
```

---

## ⚙️ Instalación

### 1. Clonar repositorio

```
git clone https://github.com/legato-desu/MathOff_app.git
cd MathOff_app
```

---

## 🖥️ Backend (Render)

⚠️ El backend ya está preparado para funcionar con PostgreSQL en la nube.

### 2. Instalar dependencias

```
cd backend
pip install -r requirements.txt
```

### 3. Configurar variables de entorno

Crear archivo `.env`:

```
SECRET_KEY=tu_secret_key
DEBUG=True

DATABASE_URL=tu_database_url_render
```

---

### 4. Ejecutar migraciones

```
python manage.py migrate
```

---

### 5. Ejecutar servidor

```
python manage.py runserver
```

---
# 🌐 Endpoints JWT
Login
```
POST /api/token/
```
Refresh Token
```
POST /api/token/refresh/
```


## 📱 Frontend

### 5. Instalar dependencias

```
cd ../frontend
npm install
```

---

### 6. Configurar URL API

Editar:

```
src/servicios/api.ts
```

```
const API_URL = "https://mathoff-app.onrender.com/api";
```

---

### 7. Ejecutar app

```
npx expo start
```

☁️ Deploy
Backend desplegado en Render
API REST desplegada en Render
PostgreSQL Cloud Database
Variables de entorno protegidas

---

## 🧪 Usuario de prueba

```
usuario: test
password: 1234
```

---

## 📌 Futuras mejoras

* OCR matemático avanzado
* Login con Google
* Historial de ejercicios
* Notificaciones push
* Estadísticas académicas
* Sistema de tareas
* Exportación de reportes PDF

---

## 👨‍💻 Autores

Desarrollado por
* **Ivan David Miranda Castro**
* **Andres Julian Granja Andrade**
