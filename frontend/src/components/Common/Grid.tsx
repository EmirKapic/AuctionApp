import Product from "models/Product";

export interface GridProps {
  className: string;
  items: Array<Product>;
}

export default function Grid(props: GridProps) {
  const gridItems = props.items.map((item) => (
    <div>
      <img
        className="object-cover"
        src="https://content-management-files.canva.com/cdn-cgi/image/f=auto,q=70/2fdbd7ab-f378-4c63-8b21-c944ad2633fd/header_t-shirts2.jpg"
      ></img>
      <h3 className="text-2xl pt-3 pb-2">{item.name}</h3>
      <p className="text-lightgrey-200">
        Start From{" "}
        <span className="text-purple">${item.startBid.toFixed(2)}</span>
      </p>
    </div>
  ));
  return <div className={props.className}>{gridItems}</div>;
}
