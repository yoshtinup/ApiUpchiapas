import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../shared/infrastructure/database/database.config';
import { IntervencionRepository } from '../../../domain/repositories/IntervencionRepository';
import { Intervencion } from '../../../domain/entities/intervencion';
import { IntervencionEntity } from '../entities/intervencion.entity';

export class TypeORMIntervencionRepository implements IntervencionRepository {
  private repository: Repository<IntervencionEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(IntervencionEntity);
  }

  async findAll(): Promise<Intervencion[]> {
    const rows = await this.repository.find({ order: { id: 'DESC' } });
    return rows.map(this.toDomain);
  }

  async findById(id: number): Promise<Intervencion | null> {
    const row = await this.repository.findOne({ where: { id } });
    return row ? this.toDomain(row) : null;
  }

  async create(data: Omit<Intervencion, 'id'>): Promise<Intervencion> {
    const entity = this.repository.create(data);
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async update(id: number, data: Partial<Omit<Intervencion, 'id'>>): Promise<Intervencion | null> {
    await this.repository.update(id, data);
    const updated = await this.repository.findOne({ where: { id } });
    return updated ? this.toDomain(updated) : null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByTutorId(tutor_id: number): Promise<Intervencion[]> {
    const rows = await this.repository.find({
      where: { tutor_id },
      order: { id: 'DESC' },
    });
    return rows.map(this.toDomain);
  }

  private toDomain(row: IntervencionEntity): Intervencion {
    return new Intervencion(
      row.id,
      row.matricula_estudiante,
      row.materia_id,
      row.tutor_id,
      row.tipoDeIntervencion,
      row.descripcion
    );
  }
}
