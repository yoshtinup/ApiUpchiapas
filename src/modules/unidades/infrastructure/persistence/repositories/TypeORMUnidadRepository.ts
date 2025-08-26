import { Repository } from 'typeorm';
import { UnidadEntity } from '../entities/unidad.entity';
import { UnidadRepository } from '../../../domain/repositories/UnidadRepository';
import { Unidad } from '../../../domain/entities/unidad';
import { AppDataSource } from '../../../../../shared/infrastructure/database/database.config';

export class TypeORMUnidadRepository implements UnidadRepository {
  private repository: Repository<UnidadEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UnidadEntity);
  }

  async findAll(): Promise<Unidad[]> {
    const unidades = await this.repository.find({
      relations: ['curso']
    });
    return unidades.map(this.toDomain);
  }

  async findById(id: number): Promise<Unidad | null> {
    const unidad = await this.repository.findOne({
      where: { id },
      relations: ['curso']
    });
    return unidad ? this.toDomain(unidad) : null;
  }

  async findByCursoId(cursoId: number): Promise<Unidad[]> {
    const unidades = await this.repository.find({
      where: { curso_id: cursoId },
      relations: ['curso'],
      order: { numero_unidad: 'ASC' }
    });
    return unidades.map(this.toDomain);
  }

  async create(unidad: Unidad): Promise<Unidad> {
    const unidadEntity = this.repository.create({
      curso_id: unidad.curso_id,
      numero_unidad: unidad.numero_unidad,
      nombre_unidad: unidad.nombre_unidad,
      descripcion: unidad.descripcion
    });

    const savedUnidad = await this.repository.save(unidadEntity);
    return this.toDomain(savedUnidad);
  }

  async update(id: number, unidad: Partial<Unidad>): Promise<Unidad | null> {
    await this.repository.update(id, unidad);
    const updatedUnidad = await this.repository.findOne({
      where: { id },
      relations: ['curso']
    });
    return updatedUnidad ? this.toDomain(updatedUnidad) : null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  private toDomain(unidadEntity: UnidadEntity): Unidad {
    return new Unidad(
      unidadEntity.id,
      unidadEntity.curso_id,
      unidadEntity.numero_unidad,
      unidadEntity.nombre_unidad,
      unidadEntity.descripcion
    );
  }
}
