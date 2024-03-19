import GenerateInvoiceUseCase from './generate.usecase';

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  };
};

describe('Generate an Invoice use case unit test', () => {
  it('should generate an invoice', async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
      name: 'User One',
      document: '123321123',
      street: 'street one',
      number: '123',
      complement: 'apto',
      city: 'city one',
      state: 'st',
      zipCode: '748539',
      items: [
        {
          id: '1',
          name: 'Item 1',
          price: 10.0
        },
        {
          id: '2',
          name: 'Item 2',
          price: 20.5
        }
      ]
    };

    const result = await usecase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.complement).toEqual(input.complement);
    expect(result.city).toEqual(input.city);
    expect(result.state).toEqual(input.state);
    expect(result.items[0].id).toEqual(input.items[0].id);
    expect(result.items[0].name).toEqual(input.items[0].name);
    expect(result.items[0].price).toEqual(input.items[0].price);
    expect(result.items[1].id).toEqual(input.items[1].id);
    expect(result.items[1].name).toEqual(input.items[1].name);
    expect(result.items[1].price).toEqual(input.items[1].price);
    expect(result.total).toEqual(result.items[1].price + result.items[0].price);
  });
});
