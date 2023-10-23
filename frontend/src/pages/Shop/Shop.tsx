import Container from "components/Common/Container";
import ProductCategories from "./Sidebar/ProductCategories";

export default function Shop() {
  return (
    <Container type="large" className="flex gap-10">
      <aside>
        <ProductCategories />
      </aside>
      <div className="flex-grow">some text</div>
    </Container>
  );
}
