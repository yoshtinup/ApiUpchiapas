export class Actividad {
  constructor(
    public id: number,
    public unidad_id: number, // Cambiado de string a number
    public nombre_actividad: string,
    public descripcion: string,
    public ponderacion: number,
    public created_at: Date,
    public updated_at: Date
  ) {}
}
