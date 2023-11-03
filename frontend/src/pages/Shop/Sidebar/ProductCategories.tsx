import CategoryDto from "models/CategoryDto";
import Sidebar from "./Sidebar";
import CategoryListItem from "./CategoryListItem";

export interface ProductCategoriesProps {
  categories: Array<CategoryDto>;
  activeId?: number;
}

export default function ProductCategories(props: ProductCategoriesProps) {
  const categories = props.categories.map((category) => (
    <CategoryListItem
      category={category}
      active={category.id === props.activeId}
      key={category.id}
    />
  ));

  return <Sidebar title="Product categories">{categories}</Sidebar>;
}
