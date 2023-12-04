import Product from "models/Product";

export default interface SortStrategy {
  sort: (products: Array<Product>) => Array<Product>;
}
