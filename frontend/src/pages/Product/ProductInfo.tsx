import Button from "components/Common/Button";
import ProductTitle from "components/Common/ProductTitle";
import Product from "models/Product";
import { ReactNode } from "react";
import Icon from "svgs/Icon";

export interface ProductInfoProps {
  product: Product;
}

interface WeeksAndDays {
  weeks: number;
  days: number;
}

function calculateTimeLeft(dateInstant: number): WeeksAndDays {
  const millis = dateInstant - Date.now();
  const days = Math.round(millis / (1000 * 60 * 60 * 24));
  return { weeks: Math.round(days / 7), days: days % 7 };
}

function renderInfoField(title: string, value: string): ReactNode {
  return (
    <div>
      {title}
      <span className="text-purple ml-1">{value}</span>
    </div>
  );
}

export default function ProductInfo(props: ProductInfoProps) {
  const { weeks, days } = calculateTimeLeft(props.product.dateEnd * 1000);
  return (
    <div>
      <ProductTitle
        title={props.product.name}
        startPrice={props.product.startBid}
      />
      <section className="p-5 border-1 border-silver w-fit mt-5 mb-14">
        {renderInfoField("Highest bid:", props.product.highestBid.toFixed(2))}
        {renderInfoField(
          "Number of bids:",
          props.product.numberOfBids.toString(),
        )}
        {renderInfoField("Time left:", `${weeks} Weeks ${days} Days`)}
      </section>

      <section className="flex gap-4 h-min mb-8 hidden">
        <input
          type="number"
          placeholder="Enter 56$ or higher"
          className="outline outline-gray-200 indent-4 py-4 flex-grow"
          min={props.product.highestBid + 1}
        />
        <Button type="primary" className="px-8 uppercase font-bold">
          <div>Place bid</div>
          <Icon name="chevronRight" />
        </Button>
      </section>

      <div className="flex border-b-2 border-slate-200">
        <button className="text-purple border-b-2 border-purple px-8 py-2">
          Details
        </button>
        <h3 className="invisible">Seller information</h3>
        <h3 className="invisible">Customer reviews</h3>
      </div>
      <p className="text-lightgrey-200 py-5">{props.product.description}</p>
    </div>
  );
}
