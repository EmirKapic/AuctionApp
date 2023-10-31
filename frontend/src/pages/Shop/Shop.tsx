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

export default function Shop() {
  const [page, setPage] = useState(0);
  const [queryParams] = useSearchParams();
  const { data, isLoading, isError } = useFetchPage<Product>(
    new UrlBuilder().products().url,
    page,
    pageSizeShop,
    undefined,
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

  const breadCrumbItems: BreadcrumbItem[] = [];
  if (queryParams.has("categoryId")) breadCrumbItems.push({ title: "" });

  return (
    <div>
      <Breadcrumb title="shop" items={[]} />
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
            items={data}
            handleNextPage={() => setPage(page + 1)}
          />
        </div>
      </Container>
    </div>
  );
}
