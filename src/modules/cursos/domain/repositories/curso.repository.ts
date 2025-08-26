import { Curso } from '../entities/curso';

export interface ICursoRepository {
  create(curso: Curso): Promise<Curso>;
  findAll(): Promise<Curso[]>;
  findById(id: number): Promise<Curso | null>;
  findByProfesorId(profesorId: number): Promise<Curso[]>;
  update(id: number, curso: Partial<Curso>): Promise<Curso | null>;
  delete(id: number): Promise<boolean>;
}
