import { useEffect, useState } from "react";

/*
  data returned from here is TECHNICALLY "T | undefined", however it
  is impossible to define it beforehand because of the generity of the function 
  (cant define T if T is generic, or atleast havent found a way to)
  */
export default function useFetchOne<T>(url: string) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
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
