import Button from "components/Common/Button";
import Table from "components/Common/Table/Table";
import { UserContext } from "contexts/UserContext";
import { fallbackImageUrl } from "defaultConstants";
import useFetchPage, { Sort } from "hooks/useFetchPage";
import Bid from "models/Bid";
import { ReactNode, useContext, useState } from "react";
import { className } from "services/ClassName";
import UrlBuilder from "services/UrlBuilder";

const sort: Sort = {
  name: "dateCreated",
  order: "desc",
};

const tableRowClassName = "grid grid-cols-5 py-3 px-4 text-left items-center";

export interface BiddersListProps {
  productId: number;
}

export default function BiddersList(props: BiddersListProps) {
  const userContext = useContext(UserContext);
  const [page, setPage] = useState(0);
  const { data } = useFetchPage<Bid>(
    new UrlBuilder().bids().product().id(props.productId).url,
    page,
    5,
    sort,
  );

  const rows = data.content.map((bid) => (
    <tr className={tableRowClassName}>
      <td className="col-span-3 flex items-center gap-4">
        <img
          src={userContext?.photoUrl || fallbackImageUrl}
          className="w-14 h-14 rounded-full border"
        />
        <span>{bid.bidder.email}</span>
      </td>
      <td>
        {new Date(bid.dateCreated).toLocaleDateString("en-gb", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </td>
      <td>${bid.bid.toFixed(2)}</td>
    </tr>
  ));

  const headers: ReactNode[] = [
    <td className="col-span-3">Bidder</td>,
    <td>Date</td>,
    <td>Bid</td>,
  ];

  return (
    <Table className="border mb-5">
      <thead className={className(tableRowClassName, "bg-lightgrey-100")}>
        {headers}
      </thead>
      <tbody>{rows}</tbody>
      {!data.last && (
        <Button
          type="primary"
          className="mx-auto py-2 px-10 mb-5"
          onClick={() => setPage((page) => page + 1)}
        >
          See more?
        </Button>
      )}
    </Table>
  );
}
