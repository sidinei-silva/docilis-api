import { ModelBase } from '../../../shared/core/models/model-base';
import { UniqueModelID } from '../../../shared/core/models/unique-model-id';

interface AdminProps {
  name: string;
  email: string;
  //@TODO: colocar omit no retorno do password
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Admin extends ModelBase<AdminProps> {
  static create(props: AdminProps, id?: UniqueModelID): Admin {
    const admin = new Admin(props, id);
    return admin;
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

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}