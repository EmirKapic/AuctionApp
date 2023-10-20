import Product from "models/Product";
import { useNavigate } from "react-router-dom";

export interface GridProps {
  className?: string;
  items: Array<Product>;
}

export default function ProductGrid(props: GridProps) {
  const navigate = useNavigate();

  const gridItems = props.items.map((item) => (
    <div
      key={item.id}
      className="cursor-pointer"
      onClick={() => navigate(`/products/${item.id}`)}
    >
      <div className="w-72 h-72">
        <img className="object-cover h-full" src={item.images[0].url} />
      </div>

      <h3 className="text-2xl py-1 font-bold cursor-pointer">{item.name}</h3>
      <p className="text-lightgrey-200">
        Start From{" "}
        <span className="text-purple">${item.startBid.toFixed(2)}</span>
      </p>
    </div>
  ));
  return <div className={props.className}>{gridItems}</div>;
}
