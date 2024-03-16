import InvoiceGateway from '../../gateway/invoice.gateway';
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO
} from './find.dto';

export default class FindInvoiceUseCase {
  constructor(private readonly repository: InvoiceGateway) {}

  async execute(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const product = await this.repository.find(input.id);

    const total = product.items.reduce((acc, item) => acc + item.price, 0);

    const items: { id: string; name: string; price: number }[] = [];
    product.items.forEach((item) => {
      items.push({
        id: item.id.id,
        name: item.name,
        price: item.price
      });
    });

    return {
      id: product.id.id,
      name: product.name,
      document: product.document,
      items: items,
      total: total,
      address: product.address,
      createdAt: product.createdAt
    };
  }
}
