import Button from "components/Common/Button";
import Product from "models/Product";
import { ReactNode } from "react";
import DateUtility from "services/DateUtility";
import Icon from "svgs/Icon";

export interface ProductInfoProps {
  product: Product;
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
  const { weeks, days } = DateUtility.getWeeksAndDays(
    props.product.dateEnd * 1000,
    Date.now(),
  );
  return (
    <div>
      <section>
        <h1 className="text-5xl font-normal text-grey_">
          {props.product.name}
        </h1>
        <h3 className="text-2xl py-4 text-purple font-light">
          Start From - ${props.product.startBid.toFixed(2)}
        </h3>
      </section>
      <section className="p-5 border-1 border-silver w-fit mt-5 mb-14">
        {renderInfoField(
          "Highest bid:",
          props.product.highestBid?.toFixed(2) || "None",
        )}
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
          min={
            props.product.highestBid
              ? props.product.highestBid + 1
              : props.product.startBid
          }
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
