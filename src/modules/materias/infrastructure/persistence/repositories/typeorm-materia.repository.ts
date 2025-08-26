import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../shared/infrastructure/database/database.config';
import { MateriaEntity } from '../entities/materia.entity';

export interface IMateriaRepository {
  create(materia: any): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: number): Promise<any | null>;
  update(id: number, materia: any): Promise<any | null>;
  delete(id: number): Promise<boolean>;
}

export class Materia {
  constructor(
    public id: number,
    public nombre: string,
    public num_cuatri: number
  ) {}
}

export class TypeOrmMateriaRepository implements IMateriaRepository {
  private get ormRepo(): Repository<MateriaEntity> {
    return AppDataSource.getRepository(MateriaEntity);
  }

  async create(materia: any): Promise<any> {
    const entity = this.ormRepo.create(materia);
    const saved = await this.ormRepo.save(entity);
    // Si saved es un array, tomar el primer elemento
    const result = Array.isArray(saved) ? saved[0] : saved;
    return new Materia(result.id, result.nombre, result.num_cuatri);
  }

  async findAll(): Promise<any[]> {
    const entities = await this.ormRepo.find();
    return entities.map(e => new Materia(e.id, e.nombre, e.num_cuatri));
  }

  async findById(id: number): Promise<any | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    if (!entity) return null;
    return new Materia(entity.id, entity.nombre, entity.num_cuatri);
  }

  async update(id: number, materia: any): Promise<any | null> {
    await this.ormRepo.update(id, materia);
    const updated = await this.ormRepo.findOne({ where: { id } });
    if (!updated) return null;
    return new Materia(updated.id, updated.nombre, updated.num_cuatri);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.ormRepo.delete(id);
    return result.affected !== 0;
  }
}
