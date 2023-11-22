import Button from "components/Common/Button";
import ProductGrid from "components/Common/ProductGrid";
import { pageSizeShop } from "defaultConstants";
import useFetchPage from "hooks/useFetchPage";
import Product from "models/Product";
import ProductDidYouMean from "models/ProductDidYouMean";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import UrlBuilder from "services/UrlBuilder";

type ProductListType = "grid" | "list";

const productListClassName: Record<ProductListType, string> = {
  grid: "grid grid-cols-3 gap-5",
  list: " ",
};

export interface ProductListProps {
  type: ProductListType;
  setDidYouMeanQuery: (didYouMean?: string) => void;
}

export default function ProductList(props: ProductListProps) {
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

  useEffect(() => {
    setPage(0);
  }, [queryParams]);

  useEffect(() => {
    if (!isLoading) {
      props.setDidYouMeanQuery(rawData?.didYouMeanQuery);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <div>Loading data...</div>;
  }
  if (isError) {
    return <div>Error while fetching data...</div>;
  }
  return (
    <div className="pb-4">
      {data.content.length !== 0 ? (
        <div>
          <ProductGrid
            itemsClassName={productListClassName[props.type]}
            imageClassName="w-full h-96"
            items={data.content}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="text-center">No matching products found...</div>
          <div className="text-center text-xl">
            Check out some of our products in the{" "}
            <span className="text-purple">categories list</span> on the side or
            try <span className="text-purple">searching</span> for your favorite
            products.
          </div>
        </div>
      )}

      {!data.last && (
        <div className="pt-10 pb-4">
          <Button
            type="primary-filled"
            className="mx-auto px-16 py-4"
            onClick={() => setPage(page + 1)}
          >
            Explore more
          </Button>
        </div>
      )}
    </div>
  );
}
