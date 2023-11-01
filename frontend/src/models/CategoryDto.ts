import Subcategory from "./Subcategory";

type CategoryDto = {
  id: number;
  name: string;
  subCategories: Array<Subcategory>;
};

export default CategoryDto;
