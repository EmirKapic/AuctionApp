import ProductTitle from "components/Common/ProductTitle";
import CategoriesList from "./CategoriesList";
import PurpleButton from "components/Common/Button";
import useFetchOne from "hooks/useFetchOne";
import Product from "models/Product";
import HeroProduct from "./HeroProduct";

export default function Hero() {
  const { data, isLoading } = useFetchOne<Product>(
    "http://localhost:8080/api/products/random",
  );

  data;

  return (
    <section className="bg-lightgrey-100 w-full mb-10">
      <div className="max-w-container-lg w-full mx-auto flex">
        <CategoriesList />
        <HeroProduct />
      </div>
    </section>
  );
}
