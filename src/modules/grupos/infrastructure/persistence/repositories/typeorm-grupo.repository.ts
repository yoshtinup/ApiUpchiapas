import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../shared/infrastructure/database/database.config';
import { GrupoEntity } from '../entities/grupo.entity';

export interface IGrupoRepository {
  create(grupo: any): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: number): Promise<any | null>;
  update(id: number, grupo: any): Promise<any | null>;
  delete(id: number): Promise<boolean>;
}

export class Grupo {
  constructor(
    public id: number,
    public numero: number,
    public materia_id: number
  ) {}
}

export class TypeOrmGrupoRepository implements IGrupoRepository {
  private get ormRepo(): Repository<GrupoEntity> {
    return AppDataSource.getRepository(GrupoEntity);
  }

  async create(grupo: any): Promise<any> {
    const entity = this.ormRepo.create(grupo);
    const saved = await this.ormRepo.save(entity);
    const result = Array.isArray(saved) ? saved[0] : saved;
    return new Grupo(result.id, result.numero, result.materia?.id ?? 0);
  }

  async findAll(): Promise<any[]> {
    const entities = await this.ormRepo.find({ relations: ['materia'] });
    return entities.map(e => new Grupo(e.id, e.numero, e.materia?.id ?? 0));
  }

  async findById(id: number): Promise<any | null> {
    const entity = await this.ormRepo.findOne({ where: { id }, relations: ['materia'] });
    if (!entity) return null;
    return new Grupo(entity.id, entity.numero, entity.materia?.id ?? 0);
  }

  async update(id: number, grupo: any): Promise<any | null> {
    await this.ormRepo.update(id, grupo);
    const updated = await this.ormRepo.findOne({ where: { id }, relations: ['materia'] });
    if (!updated) return null;
    return new Grupo(updated.id, updated.numero, updated.materia?.id ?? 0);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.ormRepo.delete(id);
    return result.affected !== 0;
  }
}
