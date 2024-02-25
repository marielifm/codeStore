import Product from "../domain/product.entity";

export default interface ProductGateway {
  add(product: Product): Promise<Product>;
  find(id: string): Promise<Product>;
}