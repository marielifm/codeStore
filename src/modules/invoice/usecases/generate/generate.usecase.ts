import Id from '../../../@shared/domain/value-object/id.value-object';
import Invoice from '../../domain/invoice';
import InvoiceItems, { invoiceItemsProps } from '../../domain/invoiceItems';
import Address from '../../domain/value-object/address.value-object';
import InvoiceGateway from '../../gateway/invoice.gateway';
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto
} from './generate.dto';

export default class GenerateInvoiceUseCase {
  private _repository: InvoiceGateway;

  constructor(repository: InvoiceGateway) {
    this._repository = repository;
  }

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = new Address(
      input.street,
      input.number,
      input.complement,
      input.city,
      input.state,
      input.zipCode
    );

    const invoiceItems: InvoiceItems[] = [];
    input.items.forEach((item) => {
      const invoiceItemsProps = {
        id: new Id(item.id) || new Id(),
        name: item.name,
        price: item.price
      };

      const invoiceItem = new InvoiceItems(invoiceItemsProps);
      invoiceItems.push(invoiceItem);
    });

    const invoiceProps = {
      id: new Id(),
      name: input.name,
      document: input.document,
      address: address,
      items: invoiceItems
    };

    const invoice = new Invoice(invoiceProps);

    await this._repository.add(invoice);

    const total = invoice.items.reduce((acc, item) => acc + item.price, 0);
    const items: { id: string; name: string; price: number }[] = [];
    invoice.items.forEach((item) => {
      items.push({
        id: item.id.id,
        name: item.name,
        price: item.price
      });
    });

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: items,
      total: total
    };
  }
}
