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

  @Column({ default: true })
  estado!: boolean;

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
