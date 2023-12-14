import Button from "components/Common/Button";
import Bid from "models/Bid";
import Product from "models/Product";
import { ReactNode, useState } from "react";
import DateUtility from "services/DateUtility";
import UrlBuilder from "services/UrlBuilder";
import UserInteractionService from "services/UserInteractionService";
import post from "services/fetching/Post";
import Icon from "svgs/Icon";

export type PurchaseBody = {
  productId: number;
};

export type PurchaseResponse = {
  message: string;
};

export type BidRequestBody = {
  bid: number;
  productId: number;
};

export interface ProductInfoProps {
  product: Product;
  userWon: boolean;
  ownedByUser: boolean;
  loggedIn: boolean;
  auctionFinished: boolean;
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
  const [isLoading, setIsLoading] = useState(false);

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
      UserInteractionService.updateInteractions(props.product);
      post<Bid, BidRequestBody>(url, {
        bid: bid,
        productId: props.product.id,
      }).then(() => props.refreshData());
    }
  }

  function onProductPurchase(): void {
    const url = new UrlBuilder().pay().url;
    setIsLoading(true);
    post<PurchaseResponse, PurchaseBody>(url, {
      productId: props.product.id,
    }).then((res) => {
      setIsLoading(false);
      window.location.replace(res.data.message);
    });
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
          props.auctionFinished
            ? "Finished"
            : DateUtility.getDuration(
                new Date(props.product.dateEnd),
                new Date(),
              ),
        )}
      </section>
      {!props.ownedByUser && !props.product.purchased && (
        <div>
          {props.auctionFinished ? (
            props.userWon && (
              <section className="flex justify-between items-center">
                <div>Seller: {props.product.user.email}</div>
                <div className="flex flex-col items-end">
                  <Button
                    type="primary"
                    className="px-8 uppercase font-bold py-3"
                    disabled={!props.loggedIn}
                    onClick={onProductPurchase}
                  >
                    <div>Buy now</div>
                    <Icon name="chevronRight" />
                  </Button>
                  {isLoading && (
                    <p className="text-purple font-bold mt-2">
                      We're preparing your purchase...
                    </p>
                  )}
                </div>
              </section>
            )
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
