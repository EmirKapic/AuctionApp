import Page from "./Page";
import Product from "./Product";

type AllProductsDto = {
  products: Page<Product>;
  approximation: boolean;
};

export default AllProductsDto;
