import Button from "components/Common/Button";
import Table from "components/Common/Table/Table";
import { bidsPageSize } from "defaultConstants";
import useFetchPage from "hooks/useFetchPage";
import Bid from "models/Bid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateUtility from "services/DateUtility";
import NotBidding from "./NotBidding";

export interface BidTableProps {
  fetchUrl: string;
}

export default function BidTable(props: BidTableProps) {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useFetchPage<Bid>(
    props.fetchUrl,
    page,
    bidsPageSize,
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
    return () => document.removeEventListener("scroll", handleScroll);
  }, [data]);
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

  const headers = headerNames.map((headerName, index) => (
    <th className={index === 1 ? "col-span-2" : ""}>{headerName}</th>
  ));

  const rows = data.content.map((bid) => (
    <tr className={rowClassName}>
      <td>
        <img src={bid.product.images[0].url} className="w-24 h-16" />
      </td>
      <td className="col-span-2">{bid.product.name}</td>
      <td>
        {DateUtility.getDuration(new Date(bid.product.dateEnd), new Date())}
      </td>
      <td>{`$${bid.bid.toFixed(2)}`}</td>
      <td>{bid.product.numberOfBids}</td>
      <td>
        {bid.product.highestBid ? (
          <div
            className={
              bid.product.highestBid === bid.bid
                ? "text-green-600"
                : "text-blue-600"
            }
          >
            {`$${bid.product.highestBid.toFixed(2)}`}
          </div>
        ) : (
          "None"
        )}
      </td>
      <td>
        <Button
          type="primary"
          className="py-2 px-8"
          onClick={() => navigate(`/shop/products/${bid.product.id}`)}
        >
          View
        </Button>
      </td>
    </tr>
  ));
  return (
    <div className="flex justify-center border border-silver mb-5">
      {data.content.length ? (
        <Table>
          <thead className={rowClassName}>{headers}</thead>
          <tbody>{rows}</tbody>
        </Table>
      ) : (
        <Table>
          <NotBidding />
        </Table>
      )}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}
