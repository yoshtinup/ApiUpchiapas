import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { MateriaEntity } from '../../../../materias/infrastructure/persistence/entities/materia.entity';
import { GrupoEntity } from '../../../../grupos/infrastructure/persistence/entities/grupo.entity';
import { Usuario } from '../../../../usuarios/infrastructure/persistence/entities/usuario.entity';

@Entity('cursos')
export class CursoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'materia_id' })
  materia_id!: number;

  @Column({ name: 'grupo_id' })
  grupo_id!: number;

  @Column({ name: 'profesor_usuario_id' })
  profesor_usuario_id!: number;

  @ManyToOne(() => MateriaEntity)
  @JoinColumn({ name: 'materia_id' })
  materia!: MateriaEntity;

  @ManyToOne(() => GrupoEntity)
  @JoinColumn({ name: 'grupo_id' })
  grupo!: GrupoEntity;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'profesor_usuario_id' })
  profesor!: Usuario;
}
