import Breadcrumb from "components/Common/Breadcrumb";
import Container from "components/Common/Container";
import useFetchAll from "hooks/useFetchAll";
import CategoryDto from "models/CategoryDto";
import Subcategory from "models/Subcategory";
import { useNavigate } from "react-router-dom";
import UrlBuilder from "services/UrlBuilder";

export default function AllCategories() {
  const navigate = useNavigate();
  const { data } = useFetchAll<CategoryDto>(new UrlBuilder().categories().url);

  function handleSubcategoryClick(subCat: Subcategory) {
    const params = new URLSearchParams();
    params.append("categoryId", subCat.category.id.toString());
    params.append("subcategoryId", subCat.id.toString());
    navigate("/shop?" + params.toString());
  }

  const categories = data.map((cat) => (
    <div>
      <h2
        className="pb-4 font-bold cursor-pointer text-2xl"
        onClick={() => navigate(`/shop?categoryId=${cat.id}`)}
      >
        {cat.name}
      </h2>
      <ul className="flex flex-col gap-1">
        {cat.subCategories.map((subcat) => (
          <li
            className="cursor-pointer hover:text-purple duration-300"
            onClick={() => handleSubcategoryClick(subcat)}
          >
            {subcat.name}
          </li>
        ))}
      </ul>
    </div>
  ));
  return (
    <div>
      <Breadcrumb
        title="All categories"
        items={[{ title: "Shop", to: "/shop" }, { title: "All categories" }]}
      />
      <Container type="large" className="grid grid-cols-4 gap-y-10 py-10">
        {categories}
      </Container>
    </div>
  );
}
