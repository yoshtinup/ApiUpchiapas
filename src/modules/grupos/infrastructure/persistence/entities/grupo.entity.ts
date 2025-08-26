import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { MateriaEntity } from '../../../../materias/infrastructure/persistence/entities/materia.entity';

@Entity('grupos')
export class GrupoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', nullable: true })
  numero!: number;

  @ManyToOne(() => MateriaEntity)
  @JoinColumn({ name: 'materia_id' })
  materia!: MateriaEntity;
}
