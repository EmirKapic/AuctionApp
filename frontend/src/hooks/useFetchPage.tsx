import Page from "models/Page";
import Product from "models/Product";
import ProductDidYouMean from "models/ProductDidYouMean";
import { useEffect, useState } from "react";
import buildQueryParams, { QueryParameter } from "services/QueryParamsBuilder";

function buildFullUrl(
  base: string,
  pageNumber: number,
  pageSize: number,
  sort?: Sort,
  queryParams?: URLSearchParams,
): string {
  let url = base + (queryParams?.has("name") ? "/search" : "") + "?";
  url += queryParams ? `${queryParams.toString()}&` : "";
  const params: QueryParameter[] = [
    { key: "page", value: pageNumber.toString() },
    { key: "size", value: pageSize.toString() },
  ];
  if (sort) {
    params.push({ key: "sort", value: `${sort.name},${sort.order}` });
  }
  return url + buildQueryParams(params);
}

type SortOrder = "asc" | "desc";

export type Sort = {
  name: string;
  order: SortOrder;
};

export default function useFetchPage(
  url: string,
  pageNumber: number,
  pageSize: number,
  sort?: Sort,
  queryParams?: URLSearchParams,
) {
  const [data, setData] = useState<Page<Product>>({ content: [], last: false });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [didYouMean, setDidYouMean] = useState(false);

  const search = queryParams?.has("name");

  useEffect(() => {
    setIsLoading(true);
    const completeUrl = buildFullUrl(
      url,
      pageNumber,
      pageSize,
      sort,
      queryParams,
    );
    const fetchData = async () => {
      try {
        const res = await fetch(completeUrl);
        const newData: Page<Product> = await res.json();
        if (!res.ok) {
          setIsError(true);
        } else if (pageNumber !== 0) {
          setData({
            ...newData,
            content: [...data.content, ...newData.content],
          });
        } else {
          setData({ ...newData });
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchDidYouMean = async () => {
      try {
        const res = await fetch(completeUrl);
        const newData: ProductDidYouMean = await res.json();
        if (!res.ok) {
          setIsError(true);
          setIsLoading(false);
          return false;
        } else if (pageNumber !== 0) {
          setData({
            ...newData.products,
            content: [...data.content, ...newData.products.content],
          });
          setIsLoading(false);
          return newData.approximation;
        } else {
          setData({ ...newData.products });
          setIsLoading(false);
          return newData.approximation;
        }
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        return false;
      }
    };
    if (!search) fetchData();
    else {
      fetchDidYouMean().then((res) => {
        setDidYouMean(res);
      });
    }
  }, [pageNumber, pageSize, url, queryParams]);

  return { data, isLoading, isError, didYouMean };
}
