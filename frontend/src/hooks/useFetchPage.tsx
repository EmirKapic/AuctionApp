import Page from "models/Page";
import { useEffect, useState } from "react";
import buildQueryParams, { QueryParameter } from "services/QueryParamsBuilder";

function buildFullUrl(
  base: string,
  pageNumber: number,
  pageSize: number,
  sort?: Sort,
  queryParams?: URLSearchParams,
): string {
  let url = base + "?";
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

export default function useFetchPage<T, R = T>(
  url: string,
  pageNumber: number,
  pageSize: number,
  sort?: Sort,
  queryParams?: URLSearchParams,
  pathToData: string[] = [],
) {
  const [data, setData] = useState<Page<T>>({ content: [], last: false });
  const [rawData, setRawData] = useState<R>();
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
        let newDataJson = await res.json();
        setRawData(newDataJson);

        for (const property of pathToData) {
          newDataJson = newDataJson[property];
        }
        if (!res.ok) {
          setIsError(true);
        } else if (pageNumber !== 0) {
          if (!newDataJson.empty) {
            setData({
              ...newDataJson,
              content: [...data.content, ...newDataJson.content],
            });
          }
        } else {
          setData({ ...newDataJson });
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageNumber, pageSize, url, queryParams, sort]);

  return { data, isLoading, isError, rawData };
}
