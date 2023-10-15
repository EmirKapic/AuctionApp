import useFetchAll from "src/hooks/useFetchAll"



export default function CategoriesList(){
    const {data, isLoading} = useFetchAll('');

    data

    
    return (
        <aside>
            <h1 className="text-purple">Categories</h1>
            <ul>
                
            </ul>
        </aside>
    )
}