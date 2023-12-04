import Product from "models/Product";
import SortStrategy from "./SortStrategy";
import comparator from "./comparator";

class DefaultSortStrategy implements SortStrategy {
  sort(products: Array<Product>): Array<Product> {
    return products.sort((product1, product2) =>
      comparator(product1.name, product2.name),
    );
  }
}

export default DefaultSortStrategy;
