import { Repository } from 'typeorm';
import { ActividadEntity } from '../entities/actividad.entity';
import { ActividadRepository } from '../../../domain/repositories/ActividadRepository';
import { Actividad } from '../../../domain/entities/actividad';
import { AppDataSource } from '../../../../../shared/infrastructure/database/database.config';

export class TypeORMActividadRepository implements ActividadRepository {
  private repository: Repository<ActividadEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(ActividadEntity);
  }

  async findAll(): Promise<Actividad[]> {
    const actividades = await this.repository.find({
      order: { created_at: 'DESC' }
    });
    return actividades.map(this.toDomain);
  }

  async findById(id: number): Promise<Actividad | null> {
    const actividad = await this.repository.findOne({
      where: { id }
    });
    return actividad ? this.toDomain(actividad) : null;
  }

  async findByUnidadId(unidadId: number): Promise<Actividad[]> {
    const actividades = await this.repository.find({
      where: { unidad_id: unidadId },
      order: { created_at: 'ASC' }
    });
    return actividades.map(this.toDomain);
  }

  async create(actividad: Actividad): Promise<Actividad> {
    const actividadEntity = this.repository.create({
      unidad_id: actividad.unidad_id,
      nombre_actividad: actividad.nombre_actividad,
      descripcion: actividad.descripcion,
      ponderacion: actividad.ponderacion
    });

    const savedActividad = await this.repository.save(actividadEntity);
    return this.toDomain(savedActividad);
  }

  async update(id: number, actividad: Partial<Actividad>): Promise<Actividad | null> {
    await this.repository.update(id, actividad);
    const updatedActividad = await this.repository.findOne({
      where: { id }
    });
    return updatedActividad ? this.toDomain(updatedActividad) : null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  private toDomain(actividadEntity: ActividadEntity): Actividad {
    return new Actividad(
      actividadEntity.id,
      actividadEntity.unidad_id,
      actividadEntity.nombre_actividad,
      actividadEntity.descripcion,
      Number(actividadEntity.ponderacion), // Convertir decimal a number
      actividadEntity.created_at,
      actividadEntity.updated_at
    );
  }
}
