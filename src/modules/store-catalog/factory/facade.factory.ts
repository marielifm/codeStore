import StoreCatalogFacade from '../facade/store-catalog.facade';
import ProductRepository from '../repository/product.repository';
import FindAllProductsUseCase from '../usecases/find-all-products/find-all-products.usecase';
import FindProductUseCase from '../usecases/find-product/find-product.usecase';

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository();
    const findUseCase = new FindProductUseCase(productRepository);
    const findAllUseCase = new FindAllProductsUseCase(productRepository);

    const facade = new StoreCatalogFacade({
      findUseCase: findUseCase,
      findAllUseCase: findAllUseCase
    });
    return facade;
  }
}
