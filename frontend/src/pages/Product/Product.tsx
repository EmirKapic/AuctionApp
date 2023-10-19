import Breadcrumb from "components/Common/Breadcrumb";
import useFetchOne from "hooks/useFetchOne";
import { useParams } from "react-router-dom";
import UrlBuilder from "services/UrlBuilder";
import ProductModel from "models/Product";
import Container from "components/Common/Container";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";

export default function Product() {
  const { id } = useParams();
  const { data, isLoading } = useFetchOne<ProductModel>(
    new UrlBuilder().products().id(parseInt(id!!)).url,
  );

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-full">
      <Breadcrumb
        title={data!!.name}
        items={[{ title: "Shop", to: "/shop" }, { title: "Single product" }]}
      />
      <Container>
        <div className="grid grid-rows-1 grid-cols-2">
          <div className="p-12 h-full pb-20">
            <ProductImages />
          </div>
          <div className="p-12 h-full pb-20">
            <ProductInfo product={data!!} />
          </div>
        </div>
      </Container>
    </div>
  );
}
