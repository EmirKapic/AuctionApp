import Page from "./Page";
import Product from "./Product";

type ProductDidYouMean = {
  products: Page<Product>;
  approximation: boolean;
};

export default ProductDidYouMean;
