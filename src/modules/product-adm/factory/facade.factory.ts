import ProductAdmFacade from '../facade/product-adm.facade';
import ProductRepository from '../repository/product.repository';
import AddProductUseCase from '../usecases/add-product/add-product.usecase';
import CheckStockUseCase from '../usecases/check-stock/check-stock.usecase';

export default class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      stockUseCase: checkStockUseCase
    });

    return productFacade;
  }
}
