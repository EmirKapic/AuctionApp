import { useEffect, useState } from "react";
import { getAuthorizationHeaders } from "services/UserAuth";

export default function useFetchOne<T>(
  url: string,
  queryParams?: URLSearchParams,
) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const completeUrl = url + (queryParams ? `?${queryParams.toString()}` : "");
    const fetchData = async () => {
      try {
        const res = await fetch(completeUrl, {
          headers: getAuthorizationHeaders(),
        });
        if (!res.ok) {
          setIsError(true);
        } else {
          setData(await res.json());
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, queryParams, key]);

  return { data, isLoading, isError, refresh: () => setKey(key + 1) };
}
