import { UserContext } from "contexts/UserContext";
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import UrlBuilder from "services/UrlBuilder";
import NotSelling from "./NotSelling";
import Button from "components/Common/Button";
import Icon from "svgs/Icon";
import { useNavigate } from "react-router-dom";
import useFetchPage from "hooks/useFetchPage";
import Product from "models/Product";
import { bidsPageSize } from "defaultConstants";
import Table, { Header, Row } from "components/Common/Table/Table";
import DateUtility from "services/DateUtility";

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
/*
As you might notice, a lot of code here overlaps with "BidTable" component
The reason is because they both serve almost same content, however
this component gets the data as a list of products (aka the products were selling)
and the other component gets the data as a list of bids (aka ON WHICH products were betting), out of which we then extract products
and i didnt manage some typescript shenanigan to make both types work the same
*/
export default function Seller() {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const userContext = useContext(UserContext);
  const [page, setPage] = useState(0);
  const fetchUrl = new UrlBuilder().products().url;

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (activeTab === 0) {
      params.append("active", "true");
    } else {
      params.append("active", "false");
    }
    params.append("sellerId", userContext!.id.toString());
    return params;
  }, [activeTab]);

  const { data, isLoading, isError } = useFetchPage<Product>(
    fetchUrl,
    page,
    bidsPageSize,
    undefined,
    queryParams,
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
  });

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
  const headers: Header[] = headerNames.map((headerName, index) => ({
    name: headerName,
    className: index == 1 ? "col-span-2" : "",
  }));

  const tableContent: Row[] = [];
  data.content.forEach((product) =>
    tableContent.push({
      dataCells: [
        <img src={product.images[0].url} className="w-24 h-16" />,
        product.name,
        DateUtility.getDuration(new Date(product.dateEnd), new Date()),
        `$${product.startBid.toFixed(2)}`,
        product.numberOfBids,
        product.highestBid ? (
          <div>{`$${product.highestBid.toFixed(2)}`}</div>
        ) : (
          "None"
        ),
        <Button
          type="primary"
          className="py-2 px-8"
          onClick={() => navigate(`/shop/products/${product.id}`)}
        >
          View
        </Button>,
      ],
      classNames: [undefined, "col-span-2", undefined, undefined, undefined],
    }),
  );

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
          onClick={() => navigate("/")}
        >
          <Icon name="plus" />
          Add item
        </Button>
      </div>
      <div className="flex justify-center border border-silver mb-5">
        <Table
          headers={headers}
          rowClassName={rowClassName}
          content={tableContent}
          emptyContentAlternative={<NotSelling />}
        />
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
}
