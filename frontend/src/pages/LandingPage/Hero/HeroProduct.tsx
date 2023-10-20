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

  function handleBid(): void {
    navigate(`/products/${data?.id}`);
  }

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
          className="px-9 py-2"
        >
          <span>Bid now</span>
          <Icon name="chevronRight" />
        </Button>
      </div>
      <aside className="w-1/2 h-full">
        <img
          className="h-96 object-cover"
          src="https://wallpaperset.com/w/full/7/7/d/66277.jpg"
        ></img>
      </aside>
    </section>
  );
}
