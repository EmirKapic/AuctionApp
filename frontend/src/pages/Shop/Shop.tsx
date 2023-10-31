import Container from "components/Common/Container";
import ProductCategories from "./Sidebar/ProductCategories";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useFetchPage from "hooks/useFetchPage";
import UrlBuilder from "services/UrlBuilder";
import { useEffect, useState } from "react";
import { pageSizeShop } from "../../constants"; //it gets mixed up with "constants" package if absolute path
import Product from "models/Product";
import ProductList from "./ProductList/ProductList";
import Breadcrumb, { BreadcrumbItem } from "components/Common/Breadcrumb";
import useFetchAll from "hooks/useFetchAll";
import CategoryWithSubs from "models/CategoryWithSubs";
import useFetchApproximate from "hooks/useFetchApproximate";

export default function Shop() {
  const [page, setPage] = useState(0);
  const [queryParams] = useSearchParams();
  const { data, isLoading, isError } = useFetchApproximate(
    new UrlBuilder().products().url,
    page,
    pageSizeShop,
    queryParams,
  );

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useFetchAll<CategoryWithSubs>(new UrlBuilder().categories().url);

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
    const shopBreadcrumb: BreadcrumbItem = { title: "shop", to: "/shop" };

    if (queryParams.has("subcategoryId")) {
      const selectedCategory = categories.find(
        (cat) => cat.id === parseInt(queryParams.get("categoryId") || "-1"),
      )!; // if there is subcatid surely there is also catId
      const selectedSubcategory = selectedCategory.subCategories.find(
        (subCat) => subCat.id === parseInt(queryParams.get("subcategoryId")!),
      )!;
      return [
        shopBreadcrumb,
        {
          title: selectedCategory.name,
          to: `/shop?categoryId=${selectedCategory.id}`,
        },
        { title: selectedSubcategory.name },
      ];
    } else if (queryParams.has("categoryId")) {
      const selectedCategory = categories.find(
        (cat) => cat.id === parseInt(queryParams.get("categoryId") || "-1"),
      )!;
      return [shopBreadcrumb, { title: selectedCategory.name }];
    } else if (queryParams.has("name")) {
      return [shopBreadcrumb, { title: "search" }];
    } else {
      return [];
    }
  }

  return (
    <div>
      <Breadcrumb title="shop" items={getBreadCrumbItems()} />
      <Container type="large" className="flex gap-10">
        <aside className="flex-shrink-0">
          <ProductCategories
            categories={categories}
            activeId={parseInt(queryParams.get("categoryId") || "-1")} //in case categoryId not present, -1 so no category is active
          />
        </aside>
        <div className="flex-grow">
          <ProductList
            type="grid"
            items={data.products}
            handleNextPage={() => setPage(page + 1)}
          />
        </div>
      </Container>
    </div>
  );
}
