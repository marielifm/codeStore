import Id from '../../../@shared/domain/value-object/id.value-object';
import Invoice from '../../domain/invoice';
import InvoiceItems from '../../domain/invoiceItems';
import Address from '../../domain/value-object/address.value-object';
import FindInvoiceUseCase from './find.usecase';

const invoiceItemOne = new InvoiceItems({
  id: new Id('1'),
  name: 'Product 1',
  price: 10.99
});

const invoice = new Invoice({
  id: new Id('1'),
  name: 'User One',
  document: '1234123',
  address: new Address(
    'string',
    'string',
    'string',
    'string',
    'string',
    'string'
  ),
  items: [invoiceItemOne]
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice))
  };
};

describe('find an invoice usecase unit test', () => {
  it('should find a invoice', async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = {
      id: '1'
    };

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBe('1');
    expect(result.name).toBe('User One');
    expect(result.document).toBe('1234123');
    expect(result.address).toEqual(invoice.address);
    expect(result.createdAt).toEqual(invoice.createdAt);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[0].id).toBe(invoice.items[0].id.id);
  });
});
