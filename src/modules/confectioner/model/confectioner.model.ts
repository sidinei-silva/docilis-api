import { ModelBase } from '../../../shared/core/models/model-base';
import { UniqueModelID } from '../../../shared/core/models/unique-model-id';

interface ConfectionerProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Confectioner extends ModelBase<ConfectionerProps> {
  static create(props: ConfectionerProps, id?: UniqueModelID): Confectioner {
    const confectioner = new Confectioner(props, id);
    return confectioner;
  }

  toJson() {
    return {
      id: this.id.toString(),
      name: this.props.name,
      email: this.props.email,
      password: this.props.password,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get email(): string {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  get password(): string {
    return this.props.password;
  }

  set password(value: string) {
    this.props.password = value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set updatedAt(value: Date) {
    this.props.updatedAt = value;
  }
}
