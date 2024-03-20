import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';

interface ItemsProps {
  id: string;
  name: string;
  price: number;
}

@Table({
  tableName: 'invoice',
  timestamps: false
})
export class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  document: string;

  @Column({ allowNull: false, type: DataType.JSON })
  items: ItemsProps[];

  @Column({ allowNull: false })
  street: string;

  @Column({ allowNull: false })
  number: string;

  @Column({ allowNull: false })
  complement: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  state: string;

  @Column({ allowNull: false })
  zipCode: string;
}
