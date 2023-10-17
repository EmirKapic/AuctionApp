import ProductTitle from "components/Common/ProductTitle";
import PurpleButton from "components/Common/PurpleButton";
import useFetchOne from "hooks/useFetchOne";
import Product from "models/Product";

export default function HeroProduct() {
  const { data, isLoading } = useFetchOne<Product>(
    "http://localhost:8080/api/products/random",
  );

  function handleBid(): void {}

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
        <PurpleButton
          text="Bid now"
          paddingX={9}
          paddingY={2}
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
