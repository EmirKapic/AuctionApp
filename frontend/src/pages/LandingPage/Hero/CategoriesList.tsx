import useFetchAll from "hooks/useFetchAll";
import Category from "models/Category";
import { useNavigate } from "react-router-dom";
import UrlBuilder from "services/UrlBuilder";

export default function CategoriesList() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useFetchAll<Category>(
    new UrlBuilder().categories().url,
  );

  const categoriesList = data.map((category) => (
    <li
      key={category.id}
      onClick={() => navigate(`/shop?categoryId=${category.id}`)}
      className="p-3 pl-4 w-full font-regular text-grey_ border-b border-silver"
    >
      <button>{category.name}</button>
    </li>
  ));

  if (isLoading) {
    return <div className="flex items-center">Loading categories...</div>;
  }
  if (isError) {
    return <div className="flex items-center">Error loading categories...</div>;
  }

  return (
    <aside className="bg-white shadow-lightgrey">
      <h1 className="text-purple p-4 pr-36">CATEGORIES</h1>
      <ul>
        {categoriesList}

        <li
          key={"all-categories"}
          className="p-3 pl-4 w-full border-b border-silver"
        >
          <button>All categories</button>
        </li>
      </ul>
    </aside>
  );
}
