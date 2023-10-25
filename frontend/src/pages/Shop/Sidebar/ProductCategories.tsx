import useFetchAll from "hooks/useFetchAll";
import CategoryWithSubs from "models/CategoryWithSubs";
import UrlBuilder from "services/UrlBuilder";
import Sidebar from "./Sidebar";
import CategoryListItem from "./CategoryListItem";

export interface ProductCategoriesProps {
  activeId?: number;
}

export default function ProductCategories(props: ProductCategoriesProps) {
  const { data, isLoading, isError } = useFetchAll<CategoryWithSubs>(
    new UrlBuilder().categories().url,
  );

  if (isLoading) {
    return <div>Loading categories...</div>;
  }
  if (isError) {
    return <div>Error while fetching data...</div>;
  }

  const categories = data.map((category) => (
    <CategoryListItem
      category={category}
      active={category.id === props.activeId}
      key={category.id}
    />
  ));

  return <Sidebar title="Product categories">{categories}</Sidebar>;
}
