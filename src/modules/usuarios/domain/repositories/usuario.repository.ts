import { Usuario } from '../entities/usuario';
import { Email } from '../../../../shared/domain/value-objects/email';

export interface UsuarioRepository {
  findAll(): Promise<Usuario[]>;
  findById(id: number): Promise<Usuario | null>;
  findByEmail(email: Email): Promise<Usuario | null>;
  create(usuario: Omit<Usuario, 'id'>): Promise<Usuario>;
  update(id: number, usuario: Partial<Usuario>): Promise<Usuario | null>;
  delete(id: number): Promise<boolean>;
}
