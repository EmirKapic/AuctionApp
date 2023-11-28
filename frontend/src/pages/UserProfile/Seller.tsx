import { UserContext } from "contexts/UserContext";
import { useContext, useState } from "react";
import BidTable from "./BidTable";
import UrlBuilder from "services/UrlBuilder";
import NotSelling from "./NotSelling";

export default function Seller() {
  const userContext = useContext(UserContext);
  const fetchUrl = new UrlBuilder()
    .bids()
    .user()
    .relationship("seller")
    .id(userContext?.id || -1).url;
  return <BidTable fetchUrl={fetchUrl} emptyAlternative={<NotSelling />} />;
}
