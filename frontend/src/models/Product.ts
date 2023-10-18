import ProductImage from "./ProductImage";
import Subcategory from "./Subcategory";
import User from "./User";

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
  productImage: Array<ProductImage>;
  user: User;
};
export default Product;
