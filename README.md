# 🧠 MathOff App

Aplicación móvil desarrollada con **React Native (Expo)** para resolver, graficar y trabajar con funciones matemáticas.
Incluye autenticación real, escaneo de ecuaciones y graficación interactiva.

---

## 🚀 Tecnologías utilizadas

### 📱 Frontend

* React Native (Expo)
* TypeScript
* Zustand (manejo de estado global)
* React Navigation
* Expo Camera

### 🖥️ Backend

* Node.js
* Express
* JWT (autenticación)
* bcrypt (encriptación)

### ☁️ Infraestructura

* Render (deploy backend)
* PostgreSQL (base de datos en la nube)

---

## 🔐 Funcionalidades principales

* Registro de usuarios
* Login con autenticación JWT
* Encriptación segura de contraseñas
* Protección de rutas (login requerido para funciones clave)
* Modal de autenticación dinámico
* Graficador de funciones matemáticas
* Escáner de ecuaciones con cámara
* Biblioteca de funciones
* Tema claro / oscuro

---

## 🧠 Flujo de la app

* La app inicia en **Inicio (informativo)**
* Funciones como **Escáner y Gráfico requieren login**
* Si el usuario no está autenticado:

  * Se abre un modal de login
  * Se bloquea el acceso a funcionalidades

---

## 📁 Estructura del proyecto

```
MathOff_app/

├── frontend/    # App móvil (Expo)
└── backend/     # API REST (Node + Express)
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
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env`:

```
PORT=3000

DB_HOST=tu_host_render
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tu_database
DB_PORT=5432

JWT_SECRET=tu_secreto
```

---

### 4. Ejecutar backend (modo local)

```
npm run dev
```

---

### 🌐 Deploy

El backend está pensado para desplegarse en:

👉 Render

---

## 📱 Frontend

### 5. Instalar dependencias

```
cd ../frontend
npm install
```

---

### 6. Configurar API

Editar:

```
src/servicios/api.ts
```

Colocar la URL de tu backend en Render:

```
const API_URL = "https://tu-backend.onrender.com/api";
```

---

### 7. Ejecutar app

```
npx expo start
```

Escanea el QR con Expo Go 📱

---

## ⚠️ Notas importantes

* El backend debe estar desplegado o corriendo
* La API debe apuntar a Render (no localhost en producción)
* Las variables `.env` no están incluidas
* PostgreSQL reemplaza completamente MySQL/XAMPP

---

## 🧪 Usuario de prueba

Puedes crear uno desde la app o usar:

```
usuario: test
password: 1234
```

---

## 📌 Futuras mejoras

* Persistencia de sesión (auto login)
* Login con Google
* OCR real para escaneo matemático
* Guardado de historial de funciones
* Mejoras UI/UX (animaciones, transición, etc.)

---

## 👨‍💻 Autor

Desarrollado por
* **Ivan Miranda**
* **Andres Granja**
