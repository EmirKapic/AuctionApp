import { UserContext } from "contexts/UserContext";
import { useContext } from "react";
import BidTable from "./BidTable";
import UrlBuilder from "services/UrlBuilder";
import NotBidding from "./NotBidding";

export default function Bids() {
  const userContext = useContext(UserContext);
  const fetchUrl = new UrlBuilder()
    .bids()
    .user()
    .id(userContext?.id || -1).url;
  return (
    <BidTable
      fetchUrl={fetchUrl}
      emptyAlternative={<NotBidding />}
      activity="buying"
    />
  );
}
