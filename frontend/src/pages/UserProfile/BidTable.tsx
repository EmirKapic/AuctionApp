import Button from "components/Common/Button";
import Table from "components/Common/Table/Table";
import { UserContext } from "contexts/UserContext";
import useFetchPage from "hooks/useFetchPage";
import Bid from "models/Bid";
import { ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateUtility from "services/DateUtility";

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
    20,
    undefined,
    props.fetchParams,
  );
  const navigate = useNavigate();
  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }
  const rowClassName = "grid grid-cols-8 py-3 px-4 ";
  const headerNames = [
    "Item",
    "Name",
    "Time left",
    "Your Price",
    "No. Bids",
    "Highest Bid",
  ];
  const headers = headerNames.map((headerName, index) => (
    <td className={index === 1 ? "col-span-2" : ""} key={index}>
      {headerName}
    </td>
  ));

  const tableContent = data.content.map((bid) => (
    <tr className={rowClassName + "items-center"} key={bid.id}>
      <td>
        <img
          src={bid.product.images[0].url}
          alt="Product image"
          className="w-24"
        ></img>
      </td>
      <td className="col-span-2">
        <div>{bid.product.name}</div>
        <div className="text-purple">#{bid.product.id}</div>
      </td>
      <td>
        {DateUtility.getDuration(new Date(bid.product.dateEnd), new Date())}
      </td>
      <td>
        $
        {props.activity === "selling"
          ? bid.product.startBid.toFixed(2)
          : bid.bid.toFixed(2)}
      </td>
      <td>{bid.product.numberOfBids}</td>
      <td>{`$${bid.product.highestBid?.toFixed(2)}` || "None"}</td>
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
      <Table
        headers={headers}
        rowClassName={rowClassName}
        content={data.content.length ? tableContent : props.emptyAlternative}
        headerClassName="bg-lightgrey-200 bg-opacity-20"
      />
    </div>
  );
}
