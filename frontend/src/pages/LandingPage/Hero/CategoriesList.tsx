import useFetchAll from "hooks/useFetchAll";
import Category from "models/Category";

export default function CategoriesList() {
  const { data, isLoading } = useFetchAll<Category>(
    "http://localhost:8080/api/categories",
  );

  const categoriesList = data.map((category) => (
    <li
      key={category.id}
      className="p-3 pl-4 w-full font-regular text-grey_ border-b-1 border-silver"
    >
      <button>{category.name}</button>
    </li>
  ));

  return (
    <aside className="bg-white shadow-lightgrey">
      <h1 className="text-purple p-4 pr-36">CATEGORIES</h1>
      <ul>
        {categoriesList}

        <li
          key={
            1283091 /* number chosen at random to stop react warning. Better way?*/
          }
          className="p-3 pl-4 w-full border-b-1 border-silver"
        >
          <button>All categories</button>
        </li>
      </ul>
    </aside>
  );
}
