import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Mapea a la tabla `intervenciones` en la BD
@Entity('intervenciones')
export class IntervencionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'matricula_estudiante', type: 'int' })
  matricula_estudiante!: number;

  // Nota: en el DDL original hay espacios antes del nombre; aquí usamos el nombre correcto de la columna
  @Column({ name: 'materia_id', type: 'int' })
  materia_id!: number;

  @Column({ name: 'tutor_id', type: 'int' })
  tutor_id!: number;

  @Column({ name: 'tipoDeIntervencion', type: 'varchar', length: 150 })
  tipoDeIntervencion!: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion!: string | null;
}
