import Container from "components/Common/Container";
import ProductCategories from "./Sidebar/ProductCategories";
import { useSearchParams } from "react-router-dom";
import UrlBuilder from "services/UrlBuilder";
import { useState } from "react";
import ProductList from "./ProductList/ProductList";
import Breadcrumb, { BreadcrumbItem } from "components/Common/Breadcrumb";
import useFetchAll from "hooks/useFetchAll";
import CategoryDto from "models/CategoryDto";
import buildQueryParams from "services/QueryParamsBuilder";
import SortType from "./SortType";
import SortBar from "./SortBar";
import GridTypePicker, { GridType } from "./GridTypePicker";

export default function Shop() {
  const [didYouMean, setDidYouMean] = useState<string>();
  const [sortType, setSortType] = useState<SortType>(SortType.DEFAULT);
  const [gridType, setGridType] = useState<GridType>("grid");
  const [queryParams] = useSearchParams();
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useFetchAll<CategoryDto>(new UrlBuilder().categories().url);

  if (categoriesLoading) {
    return <div>Loading data...</div>;
  }
  if (categoriesError) {
    return <div>Error while fetching data...</div>;
  }

  function getBreadCrumbItems(): BreadcrumbItem[] {
    const breadcrumbItems: BreadcrumbItem[] = [{ title: "shop", to: "/shop" }];
    const catId = queryParams.get("categoryId");
    const subCatId = queryParams.get("subcategoryId");
    const name = queryParams.get("name");
    if (catId) {
      const category = categories.find((cat) => cat.id === parseInt(catId))!;
      breadcrumbItems.push({
        title: category.name,
        to: `/shop?categoryId=${category.id}`,
      });
    }
    if (subCatId) {
      //if there is subCatId there will also be catId as one of the query params
      const category = categories.find((cat) => cat.id === parseInt(catId!))!;
      const subcategory = category.subCategories.find(
        (subCat) => subCat.id === parseInt(subCatId),
      )!;
      const params = buildQueryParams([
        { key: "categoryId", value: category.id.toString() },
        { key: "subcategoryId", value: subcategory.id.toString() },
      ]);
      breadcrumbItems.push({ title: subcategory.name, to: `/shop?${params}` });
    }
    if (name) {
      breadcrumbItems.push({ title: "Search" });
    }
    return breadcrumbItems;
  }
  return (
    <div>
      {didYouMean ? (
        <aside className="w-full bg-lightgrey-100">
          <Container type="small" className="py-5">
            <div>
              <span className="text-lg opacity-50">Did you mean?</span>
              <span className="ml-6 text-purple text-lg">{didYouMean}</span>
            </div>
          </Container>
        </aside>
      ) : (
        <Breadcrumb title="shop" items={getBreadCrumbItems()} />
      )}

      <Container type="large" className="flex gap-10 mt-10">
        <aside className="flex-shrink-0">
          <ProductCategories
            categories={categories}
            activeId={parseInt(queryParams.get("categoryId") || "-1")} //in case categoryId not present, -1 so no category is active
          />
        </aside>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <SortBar
              sort={sortType}
              onChange={setSortType}
              className="flex-grow"
            />
            <GridTypePicker active={gridType} onTypeChange={setGridType} />
          </div>

          <div className="pt-5">
            <ProductList
              type={gridType}
              setDidYouMeanQuery={setDidYouMean}
              sortType={sortType}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
