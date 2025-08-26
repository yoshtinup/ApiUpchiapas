import { Unidad } from '../entities/unidad';

export interface UnidadRepository {
  findAll(): Promise<Unidad[]>;
  findById(id: number): Promise<Unidad | null>;
  findByCursoId(cursoId: number): Promise<Unidad[]>;
  create(unidad: Unidad): Promise<Unidad>;
  update(id: number, unidad: Partial<Unidad>): Promise<Unidad | null>;
  delete(id: number): Promise<boolean>;
}
