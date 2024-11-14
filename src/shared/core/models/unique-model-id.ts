import { randomUUID } from 'node:crypto';

export class UniqueModelID {
  private readonly value: string;
  toString(): string {
    return this.value;
  }
  toValue() {
    return this.value;
  }
  static create(value?: string): UniqueModelID {
    return new UniqueModelID(value);
  }
  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }
}
