# 🧠 MathOff App

Aplicación móvil desarrollada con React Native (Expo) para resolver y trabajar con funciones matemáticas, incluyendo graficación, biblioteca de funciones y más.

---

## 🚀 Tecnologías utilizadas

### 📱 Frontend
- React Native (Expo)
- TypeScript
- Zustand (manejo de estado)
- React Navigation

### 🖥️ Backend
- Node.js
- Express
- MySQL (XAMPP)
- bcrypt (encriptación)
- JWT (autenticación)

---

## 🔐 Funcionalidades principales

- Registro de usuarios (username, email, contraseña)
- Login con autenticación real
- Encriptación de contraseñas
- Manejo de sesión global
- Cierre de sesión desde Settings
- Navegación dinámica según estado de autenticación
- Tema claro / oscuro

---

## 📁 Estructura del proyecto

MathOff_app/

│

├── frontend/ # App móvil (Expo)

└── backend/ # API REST (Node + Express)## ⚙️ Instalación

## ⚙️ Instalación

### 1. Clonar repositorio

```
git clone https://github.com/legato-desu/MathOff_app.git

cd MathOff_app
```
## 🖥️ Backend

### 2. Instalar dependencias
```
cd backend
npm install
```
### 3. Crear base de datos

Abrir phpMyAdmin o MySQL y ejecutar:

```sql
CREATE DATABASE mathoff_app;

USE mathoff_app;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```
### 4. Configurar conexión

Editar backend/db.js:
```
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mathoff_app",
});
```
### 5. Ejecutar backend
```
node server.js
```
Debe mostrar:
```
Servidor en http://localhost:3000
```
📱 Frontend
### 6. Instalar dependencias
```
cd ../frontend
npm install
```
### 7. Configurar API

Editar:
```
src/servicios/api.ts
```
Y colocar tu IP local:
```
const API_URL = "http://TU_IP_LOCAL:3000/api";
```
Ejemplo:

const API_URL = "http://192.168.2.187:3000/api";

### 8. Ejecutar app
```
npx expo start
```

Escanea el QR con Expo Go 📱

⚠️ Notas importantes
Debes tener MySQL/XAMPP activo
El backend debe estar corriendo antes del frontend
La IP debe coincidir con tu red local
node_modules y .env no están incluidos en el repositorio


🧪 Usuario de prueba

Puedes crear uno desde la app o usar:

```
usuario: test
password: 1234
```

📌 Futuras mejoras
Auto login (persistencia de sesión)
Login con Google
Deploy del backend
Base de datos en la nube
Recuperación de contraseña

👨‍💻 Autor

Desarrollado por Ivan Miranda y Andres Granja

⭐ Si te gusta el proyecto

¡Dale una estrella en GitHub!
