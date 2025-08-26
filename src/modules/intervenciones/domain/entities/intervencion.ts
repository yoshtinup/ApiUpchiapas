export class Intervencion {
  constructor(
    public id: number,
    public matricula_estudiante: number,
    public materia_id: number,
    public tutor_id: number,
    public tipoDeIntervencion: string,
    public descripcion: string | null
  ) {}
}
