import { Materia } from '../entities/materia';

export interface IMateriaRepository {
  create(materia: Materia): Promise<Materia>;
  findAll(): Promise<Materia[]>;
  findById(id: number): Promise<Materia | null>;
  update(id: number, materia: Partial<Materia>): Promise<Materia | null>;
  delete(id: number): Promise<boolean>;
}
