-- Crear tabla grupos
CREATE TABLE IF NOT EXISTS grupos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL,
    materia_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE,
    UNIQUE KEY unique_grupo_materia (numero, materia_id)
);

-- Insertar datos de ejemplo
INSERT INTO grupos (numero, materia_id) VALUES 
(1, 1),
(2, 1),
(1, 2),
(1, 3),
(1, 4);
