import Page from "models/Page";
import { useEffect, useState } from "react";

export default function useFetchPage(
  url: string,
  pageNumber: number,
  pageSize: number,
) {
  const [data, setData] = useState<Page>({ content: [], last: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const completeUrl = url + `?page=${pageNumber}&size=${pageSize}`;
    const fetchData = async () => {
      try {
        const res = await fetch(completeUrl);
        const newData: Page = await res.json();
        setData({
          ...newData,
          content: [...data!!.content, ...newData.content],
        });
        setIsLoading(false);
      } catch (error) {
        throw new Error("failed to fetch data");
      }
    };
    fetchData();
  }, [pageNumber, pageSize]);

  return { data, isLoading };
}
