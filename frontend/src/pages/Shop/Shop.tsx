import Container from "components/Common/Container";
import ProductCategories from "./Sidebar/ProductCategories";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useFetchPage from "hooks/useFetchPage";
import UrlBuilder from "services/UrlBuilder";
import { useEffect, useState } from "react";
import { pageSizeShop } from "defaultConstants";
import ProductList from "./ProductList/ProductList";
import Breadcrumb, { BreadcrumbItem } from "components/Common/Breadcrumb";
import useFetchAll from "hooks/useFetchAll";
import CategoryDto from "models/CategoryDto";
import Product from "models/Product";
import ProductDidYouMean from "models/ProductDidYouMean";
import buildQueryParams from "services/QueryParamsBuilder";

export default function Shop() {
  const [page, setPage] = useState(0);
  const [queryParams] = useSearchParams();
  const { data, isLoading, isError, rawData } = useFetchPage<
    Product,
    ProductDidYouMean
  >(
    new UrlBuilder().products().search().url,
    page,
    pageSizeShop,
    undefined,
    queryParams,
    ["products"],
  );

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useFetchAll<CategoryDto>(new UrlBuilder().categories().url);

  const { state } = useLocation(); //in place of props, actual props cant be used for this due to being navigated to
  useEffect(() => {
    if (state && state.pageReset) {
      //this is to allow resetting when search input is used
      setPage(0);
    }
  }, [state]);

  if (isLoading || categoriesLoading) {
    return <div>Loading data...</div>;
  }
  if (isError || categoriesError) {
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
      {rawData?.didYouMeanQuery ? (
        <aside className="w-full bg-lightgrey-100">
          <Container type="small" className="py-5">
            <div>
              <span className="text-lg opacity-50">Did you mean?</span>
              <span className="ml-6 text-purple text-lg">
                {rawData.didYouMeanQuery}
              </span>
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
          {data.content.length === 0 ? (
            <div className="flex flex-col gap-8">
              <div className="text-center">No matching products found...</div>
              <div className="text-center text-xl">
                Check out some of our products in the{" "}
                <span className="text-purple">categories list</span> on the side
                or try <span className="text-purple">searching</span> for your
                favorite products.
              </div>
            </div>
          ) : (
            <ProductList
              type="grid"
              items={data}
              handleNextPage={() => setPage(page + 1)}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
