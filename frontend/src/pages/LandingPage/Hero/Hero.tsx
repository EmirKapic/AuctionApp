import CategoriesList from "./CategoriesList";
import HeroProduct from "./HeroProduct";

export default function Hero() {
  return (
    <section className="bg-lightgrey-100 w-full mb-10">
      <div className="max-w-container-lg w-full mx-auto flex">
        <CategoriesList />
        <HeroProduct />
      </div>
    </section>
  );
}
