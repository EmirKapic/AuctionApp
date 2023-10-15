import { useEffect, useState } from "react"


export default function useFetchAll<T>(url : string){
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await fetch(url);
                setData(await res.json());
                setIsLoading(false);
            }
            catch(error){
                throw new Error("failed to fetch data");
            }
        };
        fetchData();
    }, []);
    return {data, isLoading};
}