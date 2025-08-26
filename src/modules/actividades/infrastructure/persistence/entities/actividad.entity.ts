import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('actividades')
export class ActividadEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'unidad_id', type: 'int' })
  unidad_id!: number;

  @Column({ name: 'nombre_actividad', type: 'varchar', length: 255 })
  nombre_actividad!: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion!: string;

  @Column({ 
    name: 'ponderacion', 
    type: 'decimal', 
    precision: 5, 
    scale: 4,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value)
    }
  })
  ponderacion!: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;
}
