import ProductImage from "./ProductImage";
import Subcategory from "./Subcategory";
import User from "./User";

type Product = {
  id: number;
  name: string;
  description: string;
  startBid: number;
  highestBid?: number;
  numberOfBids: number;
  dateStart: string;
  dateEnd: string;
  dateCreated: string;
  subCategory: Subcategory;
  images: Array<ProductImage>;
  user: User;
  purchased: boolean;
};
export default Product;
