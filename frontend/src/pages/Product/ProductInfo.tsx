import Button from "components/Common/Button";
import Bid from "models/Bid";
import Product from "models/Product";
import { ReactNode, useState } from "react";
import DateUtility from "services/DateUtility";
import UrlBuilder from "services/UrlBuilder";
import post from "services/fetching/Post";
import Icon from "svgs/Icon";

export type BidRequestBody = {
  bid: number;
  productId: number;
};

export interface ProductInfoProps {
  product: Product;
  userWon: boolean;
  ownedByUser: boolean;
  loggedIn: boolean;
  refreshData: () => void;
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
  const [bid, setBid] = useState<number>();
  const [warningText, setWarningText] = useState("");

  const auctionFinished = new Date(props.product.dateEnd) < new Date();

  function onPlaceBid(): void {
    if (!bid) {
      setWarningText("Please enter a bid.");
      return;
    }
    if (props.product.highestBid && bid <= props.product.highestBid) {
      setWarningText("Bid must be higher than current highest.");
    } else if (bid <= props.product.startBid) {
      setWarningText("Bid must be higher than the start bid.");
    } else {
      const url = new UrlBuilder().bids().url;
      post<Bid, BidRequestBody>(url, {
        bid: bid,
        productId: props.product.id,
      }).then(() => props.refreshData());
    }
  }

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
      <section className="p-5 border border-silver w-fit mt-5 mb-14">
        {renderInfoField(
          "Highest bid:",
          props.product.highestBid
            ? `$${props.product.highestBid.toFixed(2)}`
            : "None",
        )}
        {renderInfoField(
          "Number of bids:",
          props.product.numberOfBids.toString(),
        )}
        {renderInfoField(
          "Time left:",
          auctionFinished
            ? "Finished"
            : DateUtility.getDuration(
                new Date(props.product.dateEnd),
                new Date(),
              ),
        )}
      </section>
      {!props.ownedByUser && (
        <div>
          {auctionFinished ? (
            <section className="flex justify-between items-center">
              <div>Seller: {props.product.user.email}</div>
              <div>
                <Button
                  type="primary"
                  className="px-8 uppercase font-bold py-3"
                  disabled={!props.loggedIn}
                >
                  <div>Buy now</div>
                  <Icon name="chevronRight" />
                </Button>
              </div>
            </section>
          ) : (
            <div className=" mb-8">
              <section className="flex gap-4 h-min">
                <input
                  value={bid}
                  onChange={(e) => setBid(parseFloat(e.target.value))}
                  type="number"
                  placeholder={
                    props.loggedIn
                      ? `Enter higher than ${
                          props.product.highestBid
                            ? props.product.highestBid.toFixed(2)
                            : props.product.startBid.toFixed(2)
                        }`
                      : "Please log in to place bids"
                  }
                  className="outline outline-gray-200 indent-4 py-4 flex-grow"
                  min={
                    props.product.highestBid
                      ? props.product.highestBid + 1
                      : props.product.startBid
                  }
                  disabled={!props.loggedIn}
                />
                <Button
                  type="primary"
                  className="px-8 uppercase font-bold"
                  disabled={!props.loggedIn}
                  onClick={() => onPlaceBid()}
                >
                  <div>Place bid</div>
                  <Icon name="chevronRight" />
                </Button>
              </section>
              {<p className="mt-2 text-red-500">{warningText}</p>}
            </div>
          )}
        </div>
      )}

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
