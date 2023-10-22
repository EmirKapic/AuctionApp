import Container from "components/Common/Container";
import CategoriesList from "./CategoriesList";
import HeroProduct from "./HeroProduct";

export default function Hero() {
  return (
    <section className="bg-lightgrey-100 w-full mb-10">
      <Container className="flex" type="large">
        <CategoriesList />
        <HeroProduct />
      </Container>
    </section>
  );
}
