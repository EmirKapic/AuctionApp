import Subcategory from "./Subcategory";

type CategoryWithSubs = {
  id: number;
  name: string;
  subCategories: Array<Subcategory>;
};

export default CategoryWithSubs;
