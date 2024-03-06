import UseCaseInterface from '../../@shared/usecases/useCase.interface';
import ClientAdmFacadeInterface, {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto
} from './client-adm.facade.interface';

export interface UseCaseProps {
  findUseCase: UseCaseInterface;
  addUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findUseCaseInterface: UseCaseInterface;
  private _addUseCaseInterface: UseCaseInterface;

  constructor(userCaseProps: UseCaseProps) {
    this._findUseCaseInterface = userCaseProps.findUseCase;
    this._addUseCaseInterface = userCaseProps.addUseCase;
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addUseCaseInterface.execute(input);
  }

  async find(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutputDto> {
    const result = await this._findUseCaseInterface.execute(input);

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      address: result.address,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    };
  }
}
