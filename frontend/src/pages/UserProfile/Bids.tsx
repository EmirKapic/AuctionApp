import { UserContext } from "contexts/UserContext";
import { useContext, useState } from "react";
import BidTable from "./BidTable";
import UrlBuilder from "services/UrlBuilder";

export default function Bids() {
  const userContext = useContext(UserContext);
  const fetchUrl = new UrlBuilder()
    .bids()
    .user()
    .relationship("bidder")
    .id(userContext?.id || -1).url;
  return <BidTable fetchUrl={fetchUrl} emptyAlternative={<div>empty</div>} />;
}
