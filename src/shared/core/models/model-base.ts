import { UniqueModelID } from './unique-model-id';

export abstract class ModelBase<Props> {
  private _id: UniqueModelID;
  protected props: Props;
  get id(): UniqueModelID {
    return this._id;
  }
  protected constructor(props: Props, id?: UniqueModelID) {
    this.props = props;
    this._id = id ?? new UniqueModelID();
  }
  public equals(entity: ModelBase<Props>): boolean {
    if (this === entity) {
      return true;
    }
    if (entity.id === this._id) {
      return true;
    }
    return false;
  }
}
