import ClientGateway from '../gateway/client.gateway';
import { ClientModel } from './client.model';
import Client from '../domain/client.entity';
import Id from '../../@shared/domain/value-object/id.value-object';

export default class ClientRepository implements ClientGateway {
  async add(entity: Client): Promise<void> {
    await ClientModel.create({
      id: entity.id.id,
      name: entity.name,
      email: entity.email,
      address: entity.address,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    });
  }

  async find(id: string): Promise<Client> {
    const client = await ClientModel.findOne({ where: { id } });

    if (!client) {
      throw new Error('Client not found');
    }

    return new Client({
      id: new Id(client.dataValues.id),
      name: client.dataValues.name,
      email: client.dataValues.email,
      address: client.dataValues.address,
      createdAt: client.dataValues.createdAt,
      updatedAt: client.dataValues.createdAt
    });
  }
}
