import useFetchAll from "hooks/useFetchAll";
import Category from "models/Category";

export default function CategoriesList() {
  const { data, isLoading } = useFetchAll<Category>(
    "http://localhost:8080/api/categories",
  );

  const categoriesList = data.map((category) => (
    <li
      key={category.id}
      className="p-3 pl-4 w-full font-regular text-grey_"
      style={{
        borderBottom: "0.2px solid silver",
      }}
    >
      <button>{category.name}</button>
    </li>
  ));

  return (
    <aside
      className="bg-white"
      style={{
        boxShadow: "3px 3px 0 0 rgba(0,0,0,0.11)",
      }}
    >
      <h1 className="text-purple p-4 pr-28">CATEGORIES</h1>
      <ul>
        {categoriesList}

        <li
          key={1283091}
          className="p-3 pl-4 w-full"
          style={{
            borderBottom: "0.3px solid silver",
          }}
        >
          <button>All categories</button>
        </li>
      </ul>
    </aside>
  );
}
