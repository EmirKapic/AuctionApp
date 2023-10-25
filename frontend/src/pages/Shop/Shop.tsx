import Container from "components/Common/Container";
import ProductCategories from "./Sidebar/ProductCategories";
import { useLocation, useSearchParams } from "react-router-dom";
import useFetchPage from "hooks/useFetchPage";
import UrlBuilder from "services/UrlBuilder";
import { useEffect, useState } from "react";
import { pageSizeShop } from "constants";
import Product from "models/Product";
import ProductList from "./ProductList/ProductList";

export default function Shop() {
  const [page, setPage] = useState(0);
  const [queryParams, setQueryParams] = useSearchParams();
  const { data, isLoading, isError } = useFetchPage<Product>(
    new UrlBuilder().products().url,
    page,
    pageSizeShop,
    undefined,
    queryParams,
  );
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.pageReset) {
      setPage(0);
    }
  }, [state]);

  if (isLoading) {
    return <div>Loading data...</div>;
  }
  if (isError) {
    return <div>Error while fetching data...</div>;
  }

  return (
    <Container type="large" className="flex gap-10">
      <aside className="flex-shrink-0">
        <ProductCategories />
      </aside>
      <div className="flex-grow">
        <ProductList
          type="grid"
          items={data}
          handleNextPage={() => setPage(page + 1)}
        />
      </div>
    </Container>
  );
}
