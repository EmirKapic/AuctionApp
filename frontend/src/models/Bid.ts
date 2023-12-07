import Product from "./Product";
import User from "./User";

type Bid = {
  id: number;
  bid: number;
  dateCreated: string;
  bidder: User;
  product: Product;
};

export default Bid;
