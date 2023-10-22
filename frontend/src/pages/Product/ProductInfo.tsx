import Button from "components/Common/Button";
import ProductTitle from "components/Common/ProductTitle";
import Product from "models/Product";
import { getNormalized } from "services/DateParser";
import Icon from "svgs/Icon";

export interface ProductInfoProps {
  product: Product;
}

interface WeeksAndDays {
  weeks: number;
  days: number;
}

function calculateTimeLeft(date: Date): WeeksAndDays {
  const millis = date.getTime() - new Date().getTime();
  const days = Math.round(millis / (1000 * 60 * 60 * 24)) + 1;
  return { weeks: Math.round(days / 7), days: days % 7 };
}

export default function ProductInfo(props: ProductInfoProps) {
  const { weeks, days } = calculateTimeLeft(
    getNormalized(props.product.dateEnd),
  );
  return (
    <div>
      <ProductTitle
        title={props.product.name}
        startPrice={props.product.startBid}
      />
      <section className="p-5 border-1 border-silver w-fit mt-5 mb-14">
        <div>
          Highest bid:
          <span className="text-purple ml-1">
            ${props.product.highestBid.toFixed(2)}
          </span>
        </div>
        <div>
          Number of bids:{" "}
          <span className="text-purple ml-1">{props.product.numberOfBids}</span>
        </div>
        <div>
          Time left :
          <span className="text-purple ml-1">
            {weeks} Weeks {days} Days
          </span>
        </div>
      </section>

      <section className="flex gap-4 h-min mb-8">
        <input
          type="number"
          placeholder="Enter 56$ or higher"
          className="outline outline-gray-200 indent-4 py-4 flex-grow"
          min={props.product.highestBid + 1}
        />
        <Button type="primary">
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
