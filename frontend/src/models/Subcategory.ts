import Category from "./Category";

type Subcategory = {
  id: number;
  name: string;
  category: Category;
  productCount: number;
};

export default Subcategory;
