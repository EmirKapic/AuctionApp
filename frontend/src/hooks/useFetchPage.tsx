import Page from "models/Page";
import { useEffect, useState } from "react";

export default function useFetchPage(
  url: string,
  pageNumber: number,
  pageSize: number,
) {
  const [data, setData] = useState<Page>();
  const [isLoading, setIsLoading] = useState(true);

  const completeUrl = url + `?page=${pageNumber}&size=${pageSize}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(completeUrl);
        setData(await res.json());
        setIsLoading(false);
      } catch (error) {
        throw new Error("failed to fetch data");
      }
    };
    fetchData();
  }, []);

  return { data, isLoading };
}
