import { UniqueModelID } from '../../../shared/core/models/unique-model-id';
import { Confectioner } from '../model/confectioner.model';

export class ConfectionerMapper {
  static toDomain(entity) {
    return Confectioner.create(
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
  static toEntity(domain) {
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
