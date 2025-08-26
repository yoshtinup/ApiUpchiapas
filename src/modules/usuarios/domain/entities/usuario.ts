import { BaseEntity } from '../../../../shared/domain/entities/base.entity';
import { Email } from '../../../../shared/domain/value-objects/email';

export class Usuario extends BaseEntity {
  constructor(
    public id: number,
    public nombre: string,
    public email: Email,
    public telefono: string,
    public estado: boolean,
    public tipo: string,
    public password: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
    super();
  }

  public isActive(): boolean {
    return this.estado;
  }

  public updateEstado(estado: boolean): void {
    this.estado = estado;
  }

  public updateInfo(nombre: string, telefono: string, tipo: string): void {
    this.nombre = nombre;
    this.telefono = telefono;
    this.tipo = tipo;
  }
}
