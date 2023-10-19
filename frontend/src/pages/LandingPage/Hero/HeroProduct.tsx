import ProductTitle from "components/Common/ProductTitle";
import Button from "components/Common/Button";
import useFetchOne from "hooks/useFetchOne";
import Product from "models/Product";
import UrlBuilder from "services/UrlBuilder";
import { useNavigate } from "react-router-dom";

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
          text="Bid now"
          className="border-2 border-purple px-9 py-2 flex gap-2 items-center duration-300 text-center hover:bg-purple hover:text-white shadow-purple-md"
          onClick={handleBid}
        />
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
