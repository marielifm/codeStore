import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from './client.model';
import Id from '../../@shared/domain/value-object/id.value-object';
import Client from '../domain/client.entity';
import ClientRepository from './client.repository';

describe('Client Repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a client', async () => {
    const client = new Client({
      id: new Id('1'),
      name: 'Client 2',
      email: 'user@email.com',
      address: 'Rua 123'
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const clientDb = await ClientModel.findOne({ where: { id: '1' } });

    expect(clientDb).toBeDefined();
    expect(clientDb.dataValues.id).toEqual(client.id.id);
    expect(clientDb.dataValues.name).toEqual(client.name);
    expect(clientDb.dataValues.email).toEqual(client.email);
    expect(clientDb.dataValues.address).toEqual(client.address);
    expect(clientDb.dataValues.createdAt).toStrictEqual(client.createdAt);
    expect(clientDb.dataValues.updatedAt).toStrictEqual(client.updatedAt);
  });

  it('should find a client', async () => {
    const client = await ClientModel.create({
      id: '1',
      name: 'Client',
      email: 'user@email.com',
      address: 'Rua 123',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const repository = new ClientRepository();
    const result = await repository.find(client.dataValues.id);

    expect(result.id.id).toEqual(client.dataValues.id);
    expect(result.name).toEqual(client.dataValues.name);
    expect(result.email).toEqual(client.dataValues.email);
    expect(result.address).toEqual(client.dataValues.address);
  });
});
