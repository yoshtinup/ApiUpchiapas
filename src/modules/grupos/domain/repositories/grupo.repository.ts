import { Grupo } from '../entities/grupo';

export interface IGrupoRepository {
  create(grupo: Grupo): Promise<Grupo>;
  findAll(): Promise<Grupo[]>;
  findById(id: number): Promise<Grupo | null>;
  update(id: number, grupo: Partial<Grupo>): Promise<Grupo | null>;
  delete(id: number): Promise<boolean>;
}
