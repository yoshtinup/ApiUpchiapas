import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  nombre!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ length: 20 })
  telefono!: string;

  // Se almacena como texto 'Activo'/'Inactivo' usando un transformer (en BD deja de ser 0/1)
  @Column({
    type: 'enum',
    enum: ['Activo', 'Inactivo'],
    default: 'Inactivo',
    transformer: {
      to: (value: boolean | string) => {
        if (typeof value === 'string') return value === 'Activo' ? 'Activo' : 'Inactivo';
        return value ? 'Activo' : 'Inactivo';
      },
      from: (value: string) => value === 'Activo'
    }
  })
  estado!: boolean; // En el dominio seguimos manejando boolean

  @Column({ length: 50 })
  tipo!: string;

  @Column({ length: 255 })
  password!: string;

  // Temporalmente comentamos estas columnas para probar
  // @Column({ name: 'created_at', type: 'timestamp' })
  // createdAt!: Date;

  // @Column({ name: 'updated_at', type: 'timestamp' })
  // updatedAt!: Date;
}
