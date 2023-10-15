import useFetchAll from "src/hooks/useFetchAll"
import Category from "src/models/Category";



export default function CategoriesList(){
    const {data, isLoading} = useFetchAll<Category>('http://localhost:8080/api/categories');

    const categoriesList = data.map( category => <li key={category.id}>{category.name}</li>)

    
    return (
        <aside>
            <h1 className="text-purple">Categories</h1>
            <ul>
                {categoriesList}
            </ul>
        </aside>
    )
}