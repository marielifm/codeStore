export interface FindStoreCatalogFacadeInputDto {
  id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salePrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: {
    id: string;
    name: string;
    description: string;
    salePrice: number;
  }[];
}

export default interface StoreCatalogFacadeInterface {
  find(
    id: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto>;
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}
