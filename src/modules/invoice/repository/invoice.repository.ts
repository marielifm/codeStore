import Id from '../../@shared/domain/value-object/id.value-object';
import Invoice from '../domain/invoice';
import InvoiceItems from '../domain/invoiceItems';
import Address from '../domain/value-object/address.value-object';
import InvoiceGateway from '../gateway/invoice.gateway';
import { InvoiceModel } from './invoice.model';

export default class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({ where: { id } });

    if (!invoice) {
      throw new Error('invoice not found');
    }

    const address = new Address(
      invoice.dataValues.street,
      invoice.dataValues.number,
      invoice.dataValues.complement,
      invoice.dataValues.city,
      invoice.dataValues.state,
      invoice.dataValues.zipCode
    );

    const invoiceItems: InvoiceItems[] = [];
    invoice.dataValues.items.map(
      (item: { id: string; name: string; price: number }) => {
        const invoiceItemsProps = {
          id: new Id(item.id) || new Id(),
          name: item.name,
          price: item.price
        };

        const invoiceItem = new InvoiceItems(invoiceItemsProps);
        invoiceItems.push(invoiceItem);
      }
    );

    const invoiceProps = {
      id: invoice.dataValues.id,
      name: invoice.dataValues.name,
      document: invoice.dataValues.document,
      address: address,
      items: invoiceItems
    };
    return new Invoice(invoiceProps);
  }

  async add(invoice: Invoice): Promise<void> {
    const invoiceItems: InvoiceItems[] = [];
    invoice.items.map((item) => {
      const invoiceItemsProps = {
        id: new Id(item.id.id) || new Id(),
        name: item.name,
        price: item.price
      };

      const invoiceItem = new InvoiceItems(invoiceItemsProps);
      invoiceItems.push(invoiceItem);
    });

    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      items: invoiceItems,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode
    });
  }
}
