import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface';
import BaseEntity from '../../@shared/domain/entity/base.entity';
import Id from '../../@shared/domain/value-object/id.value-object';

type invoiceItemsProps = {
  id?: Id;
  name: string;
  price: number;
};

export default class InvoiceItems extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _price: number;

  constructor(props: invoiceItemsProps) {
    super(props.id);
    this._name = props.name;
    this._price = props.price;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}
