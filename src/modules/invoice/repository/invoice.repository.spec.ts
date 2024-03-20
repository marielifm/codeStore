import { Sequelize } from 'sequelize-typescript';
import { InvoiceModel } from './invoice.model';
import Address from '../domain/value-object/address.value-object';
import InvoiceItems from '../domain/invoiceItems';
import Invoice from '../domain/invoice';
import Id from '../../@shared/domain/value-object/id.value-object';
import InvoiceRepository from './invoice.repository';

describe('Invoice Repository Test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([InvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a, invoice', async () => {
    const invoiceItems: { id: string; name: string; price: number }[] = [
      {
        id: '1',
        name: 'Product 1',
        price: 10.11
      }
    ];

    const invoiceAdd = await InvoiceModel.create({
      id: new Id().id,
      name: 'User 1',
      document: '999999999',
      items: invoiceItems,
      street: 'Rua 1',
      number: '321',
      complement: 'apto',
      city: 'City 1',
      state: 'ST',
      zipCode: '123321123'
    });

    const repository = new InvoiceRepository();
    const result = await repository.find(invoiceAdd.dataValues.id);

    expect(result.id).toEqual(invoiceAdd.dataValues.id);
    expect(result.name).toEqual(invoiceAdd.dataValues.name);
    expect(result.document).toEqual(invoiceAdd.dataValues.document);
    expect(result.address.street).toEqual(invoiceAdd.dataValues.street);
    expect(result.address.number).toEqual(invoiceAdd.dataValues.number);
    expect(result.address.complement).toEqual(invoiceAdd.dataValues.complement);
    expect(result.address.city).toEqual(invoiceAdd.dataValues.city);
    expect(result.address.state).toEqual(invoiceAdd.dataValues.state);
    expect(result.address.zipCode).toEqual(invoiceAdd.dataValues.zipCode);
    expect(result.items[0].id.id).toEqual(invoiceAdd.dataValues.items[0].id);
    expect(result.items[0].name).toEqual(invoiceAdd.dataValues.items[0].name);
    expect(result.items[0].price).toEqual(invoiceAdd.dataValues.items[0].price);
  });

  it('should create an invoice', async () => {
    const address = new Address(
      'street 1',
      '999',
      'apto',
      'city 1',
      'st',
      '123123123'
    );

    const invoiceItemsProps = {
      id: new Id('1'),
      name: 'item 1',
      price: 10.09
    };

    const invoiceItems = new InvoiceItems(invoiceItemsProps);

    const invoiceProps = {
      id: new Id('1'),
      name: 'User 1',
      document: '123123123',
      address: address,
      items: [invoiceItems]
    };

    const invoice = new Invoice(invoiceProps);

    console.log(invoice);

    const repository = new InvoiceRepository();
    await repository.add(invoice);

    const invoiceDb = await InvoiceModel.findOne({ where: { id: '1' } });

    expect(invoiceDb).toBeDefined();
    expect(invoiceDb.dataValues.id).toEqual(invoice.id.id);
    expect(invoiceDb.dataValues.name).toEqual(invoice.name);
    expect(invoiceDb.dataValues.document).toEqual(invoice.document);
    expect(invoiceDb.dataValues.street).toEqual(invoice.address.street);
    expect(invoiceDb.dataValues.number).toEqual(invoice.address.number);
    expect(invoiceDb.dataValues.complement).toEqual(invoice.address.complement);
    expect(invoiceDb.dataValues.city).toEqual(invoice.address.city);
    expect(invoiceDb.dataValues.state).toEqual(invoice.address.state);
    expect(invoiceDb.dataValues.zipCode).toEqual(invoice.address.zipCode);
    expect(invoiceDb.dataValues.items[0]._id._id).toEqual(
      invoice.items[0].id.id
    );
    expect(invoiceDb.dataValues.items[0]._name).toEqual(invoice.items[0].name);
    expect(invoiceDb.dataValues.items[0]._price).toEqual(
      invoice.items[0].price
    );
  });
});
