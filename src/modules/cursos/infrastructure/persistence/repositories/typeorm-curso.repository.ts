import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../shared/infrastructure/database/database.config';
import { CursoEntity } from '../entities/curso.entity';

export interface ICursoRepository {
  create(curso: any): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: number): Promise<any | null>;
  findByProfesorId(profesorId: number): Promise<any[]>;
  update(id: number, curso: any): Promise<any | null>;
  delete(id: number): Promise<boolean>;
}

export class Curso {
  constructor(
    public id: number,
    public materia_id: number,
    public grupo_id: number,
    public profesor_usuario_id: number
  ) {}
}

export class TypeOrmCursoRepository implements ICursoRepository {
  private get ormRepo(): Repository<CursoEntity> {
    return AppDataSource.getRepository(CursoEntity);
  }

  async create(curso: any): Promise<any> {
    const entity = this.ormRepo.create(curso);
    const saved = await this.ormRepo.save(entity);
    const result = Array.isArray(saved) ? saved[0] : saved;
    return new Curso(result.id, result.materia_id, result.grupo_id, result.profesor_usuario_id);
  }

  async findAll(): Promise<any[]> {
    const entities = await this.ormRepo.find({ relations: ['materia', 'grupo', 'profesor'] });
    return entities.map(e => new Curso(e.id, e.materia_id, e.grupo_id, e.profesor_usuario_id));
  }

  async findById(id: number): Promise<any | null> {
    const entity = await this.ormRepo.findOne({ where: { id }, relations: ['materia', 'grupo', 'profesor'] });
    if (!entity) return null;
    return new Curso(entity.id, entity.materia_id, entity.grupo_id, entity.profesor_usuario_id);
  }

  async findByProfesorId(profesorId: number): Promise<any[]> {
    const entities = await this.ormRepo.find({ 
      where: { profesor_usuario_id: profesorId }, 
      relations: ['materia', 'grupo', 'profesor'] 
    });
    return entities.map(e => new Curso(e.id, e.materia_id, e.grupo_id, e.profesor_usuario_id));
  }

  async update(id: number, curso: any): Promise<any | null> {
    await this.ormRepo.update(id, curso);
    const updated = await this.ormRepo.findOne({ where: { id }, relations: ['materia', 'grupo', 'profesor'] });
    if (!updated) return null;
    return new Curso(updated.id, updated.materia_id, updated.grupo_id, updated.profesor_usuario_id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.ormRepo.delete(id);
    return result.affected !== 0;
  }
}
