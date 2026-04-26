CREATE DATABASE mathoff_app;

USE mathoff_app;

CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT
);

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    estado VARCHAR(20) DEFAULT 'activo',
    id_rol INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

CREATE TABLE permisos (
    id_permiso SERIAL PRIMARY KEY,
    nombre_permiso VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT
);

CREATE TABLE rol_permiso (
    id_rol INT NOT NULL,
    id_permiso INT NOT NULL,
    PRIMARY KEY (id_rol, id_permiso),
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
    FOREIGN KEY (id_permiso) REFERENCES permisos(id_permiso)
);

CREATE TABLE ejercicios (
    id_ejercicio SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    enunciado TEXT NOT NULL,
    tipo_ejercicio VARCHAR(50),
    dificultad VARCHAR(50),
    funcion_matematica TEXT,
    respuesta_correcta TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_docente INT NOT NULL,
    FOREIGN KEY (id_docente) REFERENCES usuarios(id_usuario)
);

CREATE TABLE tareas (
    id_tarea SERIAL PRIMARY KEY,
    nombre_tarea VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega DATE,
    estado VARCHAR(50) DEFAULT 'activa',
    id_docente INT NOT NULL,
    FOREIGN KEY (id_docente) REFERENCES usuarios(id_usuario)
);

CREATE TABLE tarea_ejercicio (
    id_tarea INT NOT NULL,
    id_ejercicio INT NOT NULL,
    PRIMARY KEY (id_tarea, id_ejercicio),
    FOREIGN KEY (id_tarea) REFERENCES tareas(id_tarea),
    FOREIGN KEY (id_ejercicio) REFERENCES ejercicios(id_ejercicio)
);

CREATE TABLE tarea_estudiante (
    id_tarea INT NOT NULL,
    id_estudiante INT NOT NULL,
    fecha_asignada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'pendiente',
    PRIMARY KEY (id_tarea, id_estudiante),
    FOREIGN KEY (id_tarea) REFERENCES tareas(id_tarea),
    FOREIGN KEY (id_estudiante) REFERENCES usuarios(id_usuario)
);

CREATE TABLE respuestas_estudiante (
    id_respuesta SERIAL PRIMARY KEY,
    id_estudiante INT NOT NULL,
    id_ejercicio INT NOT NULL,
    respuesta_usuario TEXT NOT NULL,
    es_correcta BOOLEAN DEFAULT FALSE,
    grafica_generada TEXT,
    fecha_respuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    calificacion NUMERIC(5,2),
    FOREIGN KEY (id_estudiante) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_ejercicio) REFERENCES ejercicios(id_ejercicio)
);

CREATE TABLE reportes (
    id_reporte SERIAL PRIMARY KEY,
    tipo_reporte VARCHAR(100),
    descripcion TEXT,
    fecha_generacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_generado_por INT,
    FOREIGN KEY (id_generado_por) REFERENCES usuarios(id_usuario)
);


INSERT INTO roles (nombre_rol, descripcion) VALUES
('Administrador', 'Control total del sistema'),
('Docente', 'Crea ejercicios y tareas'),
('Estudiante', 'Resuelve ejercicios asignados');


INSERT INTO permisos (nombre_permiso, descripcion) VALUES
('crear_usuario', 'Permite crear usuarios'),
('editar_usuario', 'Permite editar usuarios'),
('eliminar_usuario', 'Permite eliminar usuarios'),
('crear_ejercicio', 'Permite crear ejercicios'),
('asignar_tarea', 'Permite asignar tareas'),
('resolver_ejercicio', 'Permite resolver ejercicios'),
('ver_reportes', 'Permite consultar reportes'),
('calificar', 'Permite revisar respuestas'),
('graficar_funcion', 'Permite generar gráficas');







CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

