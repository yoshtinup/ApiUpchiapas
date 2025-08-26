-- Crear tabla actividades (usando INT para unidad_id)
CREATE TABLE IF NOT EXISTS actividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    unidad_id INT NOT NULL,  -- Cambiado a INT para coincidir con unidades.id
    nombre_actividad VARCHAR(255) NOT NULL,
    descripcion TEXT,
    ponderacion DECIMAL(5,4) NOT NULL,  -- Para decimales como 0.3000
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_unidad_id (unidad_id),
    FOREIGN KEY (unidad_id) REFERENCES unidades(id) ON DELETE CASCADE
);

-- Insertar datos de ejemplo con unidad_id como INT y ponderaciones decimales correctas
INSERT INTO actividades (unidad_id, nombre_actividad, descripcion, ponderacion) VALUES
(1, 'Examen Diagnóstico', 'Evaluación inicial de conocimientos', 0.1000),
(1, 'Participación en Clase', 'Participación activa durante las sesiones', 0.1500),
(1, 'Tarea 1', 'Primera tarea de la unidad introductoria', 0.2000),
(2, 'Quiz Conceptos Básicos', 'Evaluación de conceptos fundamentales', 0.2500),
(2, 'Proyecto Grupal', 'Trabajo colaborativo sobre los conceptos básicos', 0.3000),
(3, 'Práctica de Laboratorio', 'Ejercicios prácticos en laboratorio', 0.3500),
(3, 'Reporte de Práctica', 'Informe detallado de la práctica realizada', 0.2500),
(4, 'Ensayo Teórico', 'Ensayo sobre los fundamentos teóricos', 0.2000),
(4, 'Presentación Oral', 'Exposición de temas fundamentales', 0.3000),
(5, 'Proyecto Final', 'Desarrollo de competencias aplicadas', 0.4000);
