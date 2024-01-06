import ProductBucket from "./ProductBucket";

type ProductExtraInfo = {
  buckets: Array<ProductBucket>;
  maxPrice: number;
  minPrice: number;
};

export default ProductExtraInfo;
