import CategoryDto from "models/CategoryDto";
import Sidebar from "./Sidebar";
import CategoryListItem from "./CategoryListItem";
import PriceFilter from "./PriceFilter";

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

  return (
    <div className="flex flex-col gap-10">
      <Sidebar title="Product categories">{categories}</Sidebar>
      <Sidebar title="Filter by price">
        <PriceFilter />
      </Sidebar>
    </div>
  );
}
