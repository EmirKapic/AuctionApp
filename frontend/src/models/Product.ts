import Bid from "./Bid";
import ProductImage from "./ProductImage";
import Subcategory from "./Subcategory";

type Product = {
  id: number;
  name: string;
  description: string;
  startBid: number;
  highestBid: number;
  numberOfBids: number;
  dateStart: Date;
  dateEnd: Date;
  dateCreated: Date;
  subCategory: Subcategory;
  bids: Array<Bid>;
  productImages: Array<ProductImage>;
  sellerId: number;
};
export default Product;
