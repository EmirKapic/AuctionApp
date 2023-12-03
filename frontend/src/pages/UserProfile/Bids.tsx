import { UserContext } from "contexts/UserContext";
import { useContext } from "react";
import BidTable from "./BidTable";
import UrlBuilder from "services/UrlBuilder";
import NotBidding from "./NotBidding";

export default function Bids() {
  const userContext = useContext(UserContext);
  const fetchUrl = new UrlBuilder().bids().url;

  const queryParams = new URLSearchParams();
  queryParams.append("bidderId", userContext?.id.toString() || "-1");
  return (
    <BidTable
      fetchUrl={fetchUrl}
      emptyAlternative={<NotBidding />}
      activity="buying"
      params={queryParams}
    />
  );
}
