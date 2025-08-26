import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CursoEntity } from '../../../../cursos/infrastructure/persistence/entities/curso.entity';

@Entity('unidades')
export class UnidadEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'curso_id' })
  curso_id!: number;

  @Column({ name: 'numero_unidad' })
  numero_unidad!: number;

  @Column({ name: 'nombre_unidad', type: 'varchar', length: 255 })
  nombre_unidad!: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion!: string;

  @ManyToOne(() => CursoEntity)
  @JoinColumn({ name: 'curso_id' })
  curso!: CursoEntity;
}
