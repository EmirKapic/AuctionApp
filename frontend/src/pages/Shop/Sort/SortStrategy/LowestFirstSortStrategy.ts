import Product from "models/Product";
import comparator from "./comparator";
import SortStrategy from "./SortStrategy";

class LowestFirstSortStrategy implements SortStrategy {
  sort(products: Array<Product>): Array<Product> {
    return products.sort((product1, product2) =>
      comparator(product1.startBid, product2.startBid),
    );
  }
}

export default LowestFirstSortStrategy;
