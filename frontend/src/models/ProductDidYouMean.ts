import Page from "./Page";
import Product from "./Product";

type ProductDidYouMean = {
  products: Page<Product>;
  didYouMeanQuery: string;
};

export default ProductDidYouMean;
