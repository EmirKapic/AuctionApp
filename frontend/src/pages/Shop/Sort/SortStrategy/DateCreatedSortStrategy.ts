import Product from "models/Product";
import SortStrategy from "./SortStrategy";
import comparator from "./comparator";

class DateCreatedSortStrategy implements SortStrategy {
  sort(products: Array<Product>): Array<Product> {
    return products.sort((product1, product2) =>
      comparator(product1.dateStart, product2.dateStart),
    );
  }
}

export default DateCreatedSortStrategy;
