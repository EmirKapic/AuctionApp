import Button from "components/Common/Button";
import Table, { Header, Row } from "components/Common/Table/Table";
import { bidsPageSize } from "defaultConstants";
import useFetchPage from "hooks/useFetchPage";
import Bid from "models/Bid";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateUtility from "services/DateUtility";
import NotBidding from "./NotBidding";
import NotSelling from "./NotSelling";

export interface BidTableProps {
  fetchUrl: string;
  fetchParams?: URLSearchParams;
  emptyAlternative?: ReactNode;
  activity: "selling" | "buying";
}

export default function BidTable(props: BidTableProps) {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useFetchPage<Bid>(
    props.fetchUrl,
    page,
    bidsPageSize,
    undefined,
    props.fetchParams,
  );
  const navigate = useNavigate();
  function handleScroll() {
    if (isLoading || isError || data.last) return;
    if (
      document.documentElement.scrollHeight - 10 <=
      Math.floor(window.scrollY + window.innerHeight)
    ) {
      setTimeout(() => {
        setPage(page + 1);
      }, 200);
    }
  }
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
  });
  if (isError) {
    return <div>Error</div>;
  }
  const rowClassName = "grid grid-cols-8 py-3 px-4 text-left items-center";
  const headerNames = [
    "Item",
    "Name",
    "Time left",
    "Your Price",
    "No. Bids",
    "Highest Bid",
  ];
  const headers: Header[] = headerNames.map((headerName, index) => ({
    name: headerName,
    className: index == 1 ? "col-span-2" : "",
  }));

  const tableContent: Row[] = [];
  data.content.forEach((bid) =>
    tableContent.push({
      dataCells: [
        <img src={bid.product.images[0].url} className="w-24 h-16" />,
        bid.product.name,
        DateUtility.getDuration(new Date(bid.product.dateEnd), new Date()),
        props.activity === "selling"
          ? `$${bid.product.startBid.toFixed(2)}`
          : `$${bid.bid.toFixed(2)}`,
        bid.product.numberOfBids,
        bid.product.highestBid ? (
          <div
            className={
              props.activity === "buying" && bid.product.highestBid === bid.bid
                ? "text-green-600"
                : "text-blue-600"
            }
          >
            {`$${bid.product.highestBid.toFixed(2)}`}
          </div>
        ) : (
          "None"
        ),
        <Button
          type="primary"
          className="py-2 px-8"
          onClick={() => navigate(`/shop/products/${bid.product.id}`)}
        >
          View
        </Button>,
      ],
      classNames: [undefined, "col-span-2", undefined, undefined, undefined],
    }),
  );
  return (
    <div className="flex justify-center border border-silver mb-5">
      <Table
        headers={headers}
        rowClassName={rowClassName}
        content={tableContent}
        emptyContentAlternative={props.emptyAlternative}
      />
      {isLoading && <div>Loading...</div>}
    </div>
  );
}
