import Button from "components/Common/Button";
import useFetchOne from "hooks/useFetchOne";
import Product from "models/Product";
import UrlBuilder from "services/UrlBuilder";
import { useNavigate } from "react-router-dom";
import Icon from "svgs/Icon";
import { fallbackImageUrl } from "defaultConstants";

const params = new URLSearchParams();
params.append("excludeUserOwned", "true");

export default function HeroProduct() {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useFetchOne<Product>(
    new UrlBuilder().products().random().url,
    params,
  );

  if (isLoading) {
    return (
      <div className="w-full h-full text-3xl flex justify-center my-auto">
        Loading...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-full text-3xl flex justify-center my-auto">
        Error fetching product...
      </div>
    );
  }

  return (
    <section className="flex-grow p-20 w-full flex gap-5">
      <div className="w-1/2">
        <section>
          <h1 className="text-5xl font-normal text-grey_">{data.name}</h1>
          <h3 className="text-2xl py-4 text-purple font-light">
            Start From - ${data.startBid.toFixed(2)}
          </h3>
        </section>
        <p className="pb-16">{data.description}</p>
        <Button
          type="primary"
          onClick={() => navigate(`/shop/products/${data.id}`)}
          className="px-9 py-2"
        >
          <span>Bid now</span>
          <Icon name="chevronRight" />
        </Button>
      </div>
      <aside className="w-1/2 h-full">
        <img
          className="h-96 object-cover"
          src={data.images.length ? data.images[0].url : fallbackImageUrl}
        />
      </aside>
    </section>
  );
}
