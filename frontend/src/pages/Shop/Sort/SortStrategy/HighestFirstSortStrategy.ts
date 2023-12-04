import Product from "models/Product";
import comparator from "./comparator";
import SortStrategy from "./SortStrategy";

class HighestFirstSortStrategy implements SortStrategy {
  sort(products: Array<Product>): Array<Product> {
    return products.sort((product1, product2) =>
      comparator(product2.startBid, product1.startBid),
    );
  }
}

export default HighestFirstSortStrategy;
