import BidTable from "./BidTable";
import UrlBuilder from "services/UrlBuilder";

export default function Bids() {
  const fetchUrl = new UrlBuilder().bids().url;
  return <BidTable fetchUrl={fetchUrl} />;
}
