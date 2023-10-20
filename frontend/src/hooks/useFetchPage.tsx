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

  useEffect(() => {
    const completeUrl = buildFullUrl(url, pageNumber, pageSize, sort);
    const fetchData = async () => {
      try {
        const res = await fetch(completeUrl);
        const newData: Page<T> = await res.json();
        setData({
          ...newData,
          content: [...data.content, ...newData.content],
        });
      } catch (error) {
        throw new Error("failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pageNumber, pageSize, url]);

  return { data, isLoading };
}
