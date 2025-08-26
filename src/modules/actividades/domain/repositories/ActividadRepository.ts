import { Actividad } from '../entities/actividad';

export interface ActividadRepository {
  findAll(): Promise<Actividad[]>;
  findById(id: number): Promise<Actividad | null>;
  findByUnidadId(unidadId: number): Promise<Actividad[]>; // Cambiado de string a number
  create(actividad: Actividad): Promise<Actividad>;
  update(id: number, actividad: Partial<Actividad>): Promise<Actividad | null>;
  delete(id: number): Promise<boolean>;
}
