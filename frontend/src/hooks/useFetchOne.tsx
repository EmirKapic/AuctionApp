import { useEffect, useState } from "react";

export default function useFetchOne<T>(url: string) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        setData(await res.json());
        setIsLoading(false);
      } catch (error) {
        throw new Error("Error while fetching data");
      }
    };

    fetchData();
  }, []);

  return { data, isLoading };
}
