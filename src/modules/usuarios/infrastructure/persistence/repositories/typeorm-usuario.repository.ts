import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../shared/infrastructure/database/database.config';
import { Usuario as UsuarioEntity } from '../entities/usuario.entity';
import { Usuario } from '../../../domain/entities/usuario';
import { UsuarioRepository } from '../../../domain/repositories/usuario.repository';
import { Email } from '../../../../../shared/domain/value-objects/email';

export class TypeOrmUsuarioRepository implements UsuarioRepository {
  private repository: Repository<UsuarioEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UsuarioEntity);
  }

  async findAll(): Promise<Usuario[]> {
    try {
      console.log('🔍 Iniciando consulta de usuarios...');
      
      const entities = await this.repository.find();
      console.log(`📊 Se encontraron ${entities.length} registros en la base de datos`);
      
      // Filtrar y procesar solo registros válidos
      const validUsuarios: Usuario[] = [];
      
      for (const entity of entities) {
        try {
          // Validar que los campos requeridos no estén vacíos
          if (!entity.email || entity.email.trim() === '' || 
              !entity.nombre || entity.nombre.trim() === '') {
            console.log(`⚠️ Saltando registro inválido - ID: ${entity.id}, email: "${entity.email}", nombre: "${entity.nombre}"`);
            continue;
          }
          
          const usuario = this.toDomain(entity);
          validUsuarios.push(usuario);
        } catch (error: any) {
          console.error(`❌ Error procesando usuario ID ${entity.id}:`, error.message);
          continue; // Continuar con el siguiente registro
        }
      }
      
      console.log(`✅ Se procesaron ${validUsuarios.length} usuarios válidos`);
      return validUsuarios;
      
    } catch (error: any) {
      console.error('💥 Error en findAll:', error);
      throw error;
    }
  }

  async findById(id: number): Promise<Usuario | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByEmail(email: Email): Promise<Usuario | null> {
    const entity = await this.repository.findOne({ where: { email: email.getValue() } });
    return entity ? this.toDomain(entity) : null;
  }

  async create(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
    const entity = this.repository.create({
      nombre: usuario.nombre,
      email: usuario.email.getValue(),
      telefono: usuario.telefono,
      // El transformer en la entidad convertirá boolean -> 'Activo'/'Inactivo'
      estado: usuario.estado,
      tipo: usuario.tipo,
      password: usuario.password,
    });
    
    const savedEntity = await this.repository.save(entity);
    return this.toDomain(savedEntity);
  }

  async update(id: number, usuario: Partial<Usuario>): Promise<Usuario | null> {
    const updateData: any = {};
    
    if (usuario.nombre) updateData.nombre = usuario.nombre;
    if (usuario.email) updateData.email = usuario.email.getValue();
    if (usuario.telefono) updateData.telefono = usuario.telefono;
  if (usuario.estado !== undefined) updateData.estado = usuario.estado; // transformer maneja conversión
    if (usuario.tipo) updateData.tipo = usuario.tipo;
    if (usuario.password) updateData.password = usuario.password;

    await this.repository.update(id, updateData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  private toDomain(entity: UsuarioEntity): Usuario {
    try {
      console.log(`🔄 Procesando entidad - ID: ${entity.id}, Email: "${entity.email}"`);
      
      return new Usuario(
        entity.id,
        entity.nombre || 'Sin nombre',
        new Email(entity.email),
        entity.telefono || 'Sin teléfono',
        entity.estado ?? true,
        entity.tipo || 'Sin tipo',
        entity.password || 'Sin password',
        undefined, // createdAt temporalmente undefined
        undefined  // updatedAt temporalmente undefined
      );
    } catch (error: any) {
      console.error(`❌ Error al crear dominio para usuario ID ${entity.id}, email: "${entity.email}":`, error.message);
      throw error;
    }
  }
}
