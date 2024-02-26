import UseCaseInterface from '../../@shared/usecases/useCase.interface';
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto
} from './product-adm.facade.interface';

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUseCase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._addUseCase = useCaseProps.addUseCase;
    this._checkStockUseCase = useCaseProps.stockUseCase;
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this._addUseCase.execute(input);
  }
  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUseCase.execute(input);
  }
}
