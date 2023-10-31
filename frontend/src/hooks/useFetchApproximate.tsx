import AllProductsDto from "models/AllProductsDto";
import { useEffect, useState } from "react";
import buildQueryParams, { QueryParameter } from "services/QueryParamsBuilder";

function buildFullUrl(
  base: string,
  pageNumber: number,
  pageSize: number,
  queryParams: URLSearchParams,
): string {
  let url = base + "?";
  url += queryParams ? `${queryParams.toString()}&` : "";
  const params: QueryParameter[] = [
    { key: "page", value: pageNumber.toString() },
    { key: "size", value: pageSize.toString() },
  ];
  return url + buildQueryParams(params);
}

export default function useFetchApproximate(
  url: string,
  pageNumber: number,
  pageSize: number,
  queryParams: URLSearchParams,
) {
  const [data, setData] = useState<AllProductsDto>({
    products: { content: [], last: true },
    approximation: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const completeUrl = buildFullUrl(url, pageNumber, pageSize, queryParams);
    const fetchData = async () => {
      try {
        const res = await fetch(completeUrl);
        const newData: AllProductsDto = await res.json();
        if (!res.ok) {
          setIsError(true);
        } else if (pageNumber !== 0) {
          setData({
            ...newData,
            products: {
              ...newData.products,
              content: [...data.products.content, ...newData.products.content],
            },
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
    fetchData();
  }, [url, pageNumber, pageSize, queryParams]);

  return { data, isLoading, isError };
}
