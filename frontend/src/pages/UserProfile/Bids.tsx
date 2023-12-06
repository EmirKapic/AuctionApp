import { UserContext } from "contexts/UserContext";
import { useContext } from "react";
import BidTable from "./BidTable";
import UrlBuilder from "services/UrlBuilder";

export default function Bids() {
  const userContext = useContext(UserContext);
  const fetchUrl = new UrlBuilder().bids().url;

  const queryParams = new URLSearchParams();
  queryParams.append("bidderId", userContext?.id.toString() || "-1");
  return <BidTable fetchUrl={fetchUrl} params={queryParams} />;
}
