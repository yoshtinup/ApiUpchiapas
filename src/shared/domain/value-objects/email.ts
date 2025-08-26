export class Email {
  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    // Verificar si el valor no es null, undefined o vacío
    if (!this.value || typeof this.value !== 'string' || this.value.trim().length === 0) {
      throw new Error('Email no puede estar vacío');
    }

    // Regex más permisiva para validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value.trim())) {
      throw new Error(`Email inválido: ${this.value}`);
    }
  }

  getValue(): string {
    return this.value.trim();
  }

  equals(other: Email): boolean {
    return this.value.trim() === other.value.trim();
  }
}
