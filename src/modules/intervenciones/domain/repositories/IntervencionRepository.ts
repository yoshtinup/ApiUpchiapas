import { Intervencion } from '../entities/intervencion';

export interface IntervencionRepository {
  findAll(): Promise<Intervencion[]>;
  findById(id: number): Promise<Intervencion | null>;
  create(data: Omit<Intervencion, 'id'>): Promise<Intervencion>;
  update(id: number, data: Partial<Omit<Intervencion, 'id'>>): Promise<Intervencion | null>;
  delete(id: number): Promise<boolean>;
  findByTutorId(tutor_id: number): Promise<Intervencion[]>; // nuevo
}
