import { UserContext } from "contexts/UserContext";
import { ReactNode, useContext, useState } from "react";
import BidTable from "./BidTable";
import UrlBuilder from "services/UrlBuilder";
import NotSelling from "./NotSelling";
import Button from "components/Common/Button";
import Icon from "svgs/Icon";
import { useNavigate } from "react-router-dom";

function renderTabButton(
  label: string,
  active: boolean,
  onClick: () => void,
): ReactNode {
  return (
    <Button
      type={active ? "primary-filled" : "primary"}
      className={
        "py-2 px-5 shadow-none " +
        (!active &&
          "hover:bg-lightgrey-200 hover:bg-opacity-40 hover:text-black")
      }
      onClick={(e) => onClick()}
    >
      {label}
    </Button>
  );
}

export default function Seller() {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const fetchUrl = new UrlBuilder()
    .bids()
    .user()
    .relationship("seller")
    .id(userContext?.id || -1).url;
  const activeParams = new URLSearchParams();
  activeParams.append("active", "true");
  const soldParams = new URLSearchParams();
  soldParams.append("active", "false");

  return (
    <div>
      <div className="flex justify-between items-end">
        <div className="flex">
          {renderTabButton("Active", activeTab === 0, () => setActiveTab(0))}
          {renderTabButton("Sold", activeTab === 1, () => setActiveTab(1))}
        </div>
        <Button
          type="primary"
          className="py-2 px-16 mb-3"
          onClick={() => navigate("/account/sell")}
        >
          <Icon name="plus" />
          Add item
        </Button>
      </div>
      <BidTable
        fetchUrl={fetchUrl}
        fetchParams={activeTab === 0 ? activeParams : soldParams}
        emptyAlternative={activeTab === 0 ? <NotSelling /> : ""}
        activity="selling"
      />
    </div>
  );
}
