-- Migración: convertir columna estado (TINYINT/BOOLEAN) a ENUM('Activo','Inactivo')
-- Ajusta el nombre de la base de datos si es necesario antes de ejecutar.

START TRANSACTION;

-- 1. Cambiar los valores existentes 1->'Activo', 0->'Inactivo' usando una columna temporal
ALTER TABLE usuarios ADD COLUMN estado_tmp ENUM('Activo','Inactivo') NULL AFTER telefono;

UPDATE usuarios SET estado_tmp = CASE WHEN estado = 1 THEN 'Activo' ELSE 'Inactivo' END;

-- 2. Eliminar la columna antigua
ALTER TABLE usuarios DROP COLUMN estado;

-- 3. Renombrar la temporal a estado y poner NOT NULL default 'Inactivo'
ALTER TABLE usuarios CHANGE COLUMN estado_tmp estado ENUM('Activo','Inactivo') NOT NULL DEFAULT 'Inactivo';

COMMIT;

-- Rollback manual (si fuera necesario) sería crear columna tinyint y mapear inverso:
-- ALTER TABLE usuarios ADD COLUMN estado_old TINYINT(1) NULL AFTER telefono;
-- UPDATE usuarios SET estado_old = CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END;
-- ALTER TABLE usuarios DROP COLUMN estado;
-- ALTER TABLE usuarios CHANGE COLUMN estado_old estado TINYINT(1) NOT NULL DEFAULT 1;
