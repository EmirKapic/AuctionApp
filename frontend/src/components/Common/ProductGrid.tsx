import Product from "models/Product";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export type ItemOrientation = "horizontal" | "vertical";

export interface GridProps {
  itemsClassName?: string;
  imageClassName?: string;
  items: Array<Product>;
  type: ItemOrientation;
}

export default function ProductGrid(props: GridProps) {
  const navigate = useNavigate();

  const gridItems = props.items.map((item) =>
    props.type === "vertical" ? (
      <div
        key={item.id}
        className="cursor-pointer"
        onClick={() => navigate(`/shop/products/${item.id}`)}
      >
        <div className={props.imageClassName}>
          <img
            className="object-cover w-full h-full"
            src={item.images[0].url}
          />
        </div>

        <h3 className="text-2xl py-1 font-bold cursor-pointer">{item.name}</h3>
        <p className="text-lightgrey-200">
          Start From{" "}
          <span className="text-purple">${item.startBid.toFixed(2)}</span>
        </p>
      </div>
    ) : (
      <div key={item.id} className="flex py-5 border px-2 gap-10">
        <div className="flex-shrink-0">
          <img src={item.images[0].url} className="w-80 h-96 object-cover" />
        </div>
        <div className="flex-grow">
          <h2 className="text-3xl font-bold pb-2">{item.name}</h2>
          <p className="text-lightgrey-200">{item.description}</p>
          <div>
            <h2 className="text-purple text-3xl py-5">{`Start From $${item.startBid.toFixed(
              2,
            )}`}</h2>
            <Button
              type="secondary"
              className="py-1 px-6 hover:bg-lightgrey-200 hover:bg-opacity-30"
              onClick={() => navigate(`/shop/products/${item.id}`)}
            >
              Bid
            </Button>
          </div>
        </div>
      </div>
    ),
  );
  return <div className={props.itemsClassName}>{gridItems}</div>;
}
