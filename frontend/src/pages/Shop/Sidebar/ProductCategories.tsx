import useFetchAll from "hooks/useFetchAll";
import CategoryWithSubs from "models/CategoryWithSubs";
import UrlBuilder from "services/UrlBuilder";
import Sidebar from "./Sidebar";
import CategoryListItem from "./CategoryListItem";
import { useState } from "react";

export default function ProductCategories() {
  const [isActiveIndex, setIsActiveIndex] = useState(0); //will be set with props

  const { data, isLoading, isError } = useFetchAll<CategoryWithSubs>(
    new UrlBuilder().categories().url,
  );

  if (isLoading) {
    return <div>Loading categories...</div>;
  }
  if (isError) {
    return <div>Error while fetching data...</div>;
  }

  const categories = data.map((category, index) => (
    <CategoryListItem
      category={category}
      active={index === isActiveIndex}
      key={category.id}
    />
  ));

  return <Sidebar title="Product categories">{categories}</Sidebar>;
}
