import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('materias')
export class MateriaEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nombre!: string;

  @Column({ type: 'int', nullable: true })
  num_cuatri!: number;
}
