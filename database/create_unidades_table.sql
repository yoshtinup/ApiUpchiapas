-- Crear tabla unidades
CREATE TABLE IF NOT EXISTS unidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    curso_id INT NOT NULL,
    numero_unidad INT NOT NULL,
    nombre_unidad VARCHAR(255) NOT NULL,
    descripcion TEXT,
    INDEX idx_curso_id (curso_id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);

-- Insertar datos de ejemplo
INSERT INTO unidades (curso_id, numero_unidad, nombre_unidad, descripcion) VALUES
(1, 1, 'Introducción', 'Unidad introductoria del curso'),
(1, 2, 'Conceptos Básicos', 'Fundamentos y conceptos básicos'),
(1, 3, 'Práctica Inicial', 'Primeros ejercicios prácticos'),
(2, 1, 'Fundamentos', 'Bases del conocimiento'),
(2, 2, 'Desarrollo', 'Desarrollo de competencias'),
(3, 1, 'Teoría', 'Marco teórico de la materia'),
(3, 2, 'Aplicación', 'Aplicación práctica de conocimientos');
