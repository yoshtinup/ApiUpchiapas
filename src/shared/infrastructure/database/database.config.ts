import { DataSource } from 'typeorm';
import { config } from '../config/environment.config';
import { Usuario } from '../../../modules/usuarios/infrastructure/persistence/entities/usuario.entity';
import { MateriaEntity } from '../../../modules/materias/infrastructure/persistence/entities/materia.entity';
import { GrupoEntity } from '../../../modules/grupos/infrastructure/persistence/entities/grupo.entity';
import { CursoEntity } from '../../../modules/cursos/infrastructure/persistence/entities/curso.entity';
import { UnidadEntity } from '../../../modules/unidades/infrastructure/persistence/entities/unidad.entity';
import { ActividadEntity } from '../../../modules/actividades/infrastructure/persistence/entities/actividad.entity';
import { IntervencionEntity } from '../../../modules/intervenciones/infrastructure/persistence/entities/intervencion.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [Usuario, MateriaEntity, GrupoEntity, CursoEntity, UnidadEntity, ActividadEntity, IntervencionEntity],
  synchronize: false,
  logging: true,
});
