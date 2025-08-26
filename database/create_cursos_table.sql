-- Crear tabla cursos
CREATE TABLE IF NOT EXISTS cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    materia_id INT NOT NULL,
    grupo_id INT NOT NULL,
    profesor_usuario_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE,
    FOREIGN KEY (grupo_id) REFERENCES grupos(id) ON DELETE CASCADE,
    FOREIGN KEY (profesor_usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE KEY unique_curso (materia_id, grupo_id, profesor_usuario_id)
);

-- Insertar datos de ejemplo (usando IDs de usuarios existentes)
-- Nota: Asegúrate de que existan usuarios con estos IDs en la tabla usuarios
INSERT INTO cursos (materia_id, grupo_id, profesor_usuario_id) VALUES 
(1, 1, 1),
(1, 2, 2),
(2, 3, 1),
(3, 4, 3),
(4, 5, 2);
