import ProductTitle from "components/Common/ProductTitle";
import Button from "components/Common/Button";
import useFetchOne from "hooks/useFetchOne";
import Product from "models/Product";
import UrlBuilder from "services/UrlBuilder";
import { useNavigate } from "react-router-dom";
import Icon from "svgs/Icon";

export default function HeroProduct() {
  const navigate = useNavigate();
  const { data, isLoading } = useFetchOne<Product>(
    new UrlBuilder().products().random().url,
  );

  if (isLoading) {
    return (
      <div className="w-full h-full text-3xl flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="flex-grow p-20 w-full flex gap-5">
      <div className="w-1/2">
        <ProductTitle title={data!!.name} startPrice={data!!.startBid} />
        <p className="pb-16">{data!!.description}</p>
        <Button
          type="primary"
          onClick={() => navigate(`/products/${data?.id}`)}
          className="px-9 py-2 invisible"
        >
          <span>Bid now</span>
          <Icon name="chevronRight" />
        </Button>
      </div>
      <aside className="w-1/2 h-full">
        <img className="h-96 object-cover" src={data?.images[1].url} />
      </aside>
    </section>
  );
}
