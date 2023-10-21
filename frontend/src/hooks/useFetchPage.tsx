import Page from "models/Page";
import { useEffect, useState } from "react";

function buildFullUrl(
  base: string,
  pageNumber: number,
  pageSize: number,
  sort?: string,
): string {
  const searchParams = new URLSearchParams();
  searchParams.append("page", pageNumber.toString());
  searchParams.append("size", pageSize.toString());
  if (sort) {
    searchParams.append("sort", sort);
  }
  return base + "?" + searchParams.toString();
}

export default function useFetchPage<T>(
  url: string,
  pageNumber: number,
  pageSize: number,
  sort?: string,
) {
  const [data, setData] = useState<Page<T>>({ content: [], last: false });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const completeUrl = buildFullUrl(url, pageNumber, pageSize, sort);
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
  }, [pageNumber, pageSize, url]);

  return { data, isLoading, isError };
}
