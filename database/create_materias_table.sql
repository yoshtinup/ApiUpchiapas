-- Crear tabla materias
CREATE TABLE IF NOT EXISTS materias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    num_cuatri INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO materias (nombre, num_cuatri) VALUES 
('Matemáticas I', 1),
('Programación I', 1),
('Física I', 2),
('Base de Datos', 3),
('Ingeniería de Software', 4);
