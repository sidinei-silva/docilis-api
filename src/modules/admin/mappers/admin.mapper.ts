import { UniqueModelID } from '../../../shared/core/models/unique-model-id';
import { AdminEntity } from '../database/entities/admin.entity';
import { Admin } from '../model/admin.model';
export class AdminMapper {
  static toDomain(entity): Admin {
    return Admin.create(
      {
        name: entity.name,
        email: entity.email,
        password: entity.password,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
      UniqueModelID.create(entity.id),
    );
  }
  static toEntity(domain): AdminEntity {
    return {
      id: domain.id.toString(),
      name: domain.name,
      email: domain.email,
      password: domain.password,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
