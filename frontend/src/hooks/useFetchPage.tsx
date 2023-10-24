import Page from "models/Page";
import { useEffect, useState } from "react";

function buildFullUrl(
  base: string,
  pageNumber: number,
  pageSize: number,
  sort?: Sort,
  queryParams?: URLSearchParams,
): string {
  let url = base + "?";
  url += queryParams ? `${queryParams.toString()}&` : "";
  const pageParams = new URLSearchParams();
  pageParams.append("page", pageNumber.toString());
  pageParams.append("size", pageSize.toString());
  if (sort) {
    pageParams.append("sort", `${sort.name},${sort.order}`);
  }
  return url + pageParams.toString();
}

type SortOrder = "asc" | "desc";

export type Sort = {
  name: string;
  order: SortOrder;
};

export default function useFetchPage<T>(
  url: string,
  pageNumber: number,
  pageSize: number,
  sort?: Sort,
  queryParams?: URLSearchParams,
) {
  const [data, setData] = useState<Page<T>>({ content: [], last: false });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
        const newData: Page<T> = await res.json();
        if (!res.ok) {
          setIsError(true);
        } else {
          setData({
            ...newData,
            content: [...data.content, ...newData.content],
          });
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pageNumber, pageSize, url, queryParams]);

  return { data, isLoading, isError };
}
