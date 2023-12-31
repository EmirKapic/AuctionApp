import { useEffect, useState } from "react";
import { getAuthorizationHeaders } from "services/UserAuth";

export default function useFetchAll<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, { headers: getAuthorizationHeaders() });
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
  }, [url]);
  return { data, isLoading, isError };
}
