import Breadcrumb from "components/Common/Breadcrumb";
import useFetchOne from "hooks/useFetchOne";
import { useParams } from "react-router-dom";
import UrlBuilder from "services/UrlBuilder";
import ProductModel from "models/Product";
import Container from "components/Common/Container";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import Bid from "models/Bid";
import { useContext, useMemo } from "react";
import { UserContext } from "contexts/UserContext";
import AlertMessage from "components/Common/AlertMessage";

export default function Product() {
  const { id } = useParams();
  const userContext = useContext(UserContext);
  const { data, isLoading, isError } = useFetchOne<ProductModel>(
    new UrlBuilder().products().id(parseInt(id!)).url,
  );

  const url = new UrlBuilder().bids().url;
  const params = useMemo(() => {
    const searchParams = new URLSearchParams();
    searchParams.append("bidderId", userContext?.id.toString() || "-1");
    searchParams.append("highestOnly", "true");
    searchParams.append("productId", data?.id.toString() || "-1");
    return searchParams;
  }, [data, userContext]);

  const { data: userBid } = useFetchOne<Bid>(url + `?${params.toString()}`);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError || !data) {
    return <div>Error while loading product...</div>;
  }
  const highestBidder = data.highestBid === userBid?.bid;
  return (
    <div className="w-full">
      <Breadcrumb
        title={data.name}
        items={[{ title: "Shop", to: "/shop" }, { title: "Single product" }]}
      />
      {userBid && (
        <AlertMessage type={highestBidder ? "success" : "warning"}>
          {highestBidder
            ? "Congratulations! You are the highest bidder."
            : "There are higher bids than yours. Try again?"}
        </AlertMessage>
      )}

      <Container type="large">
        <div className="grid grid-rows-1 grid-cols-2">
          <div className="p-12 h-full pb-20">
            <ProductImages images={data.images} />
          </div>
          <div className="p-12 h-full pb-20">
            <ProductInfo
              product={data}
              userWon={highestBidder}
              ownedByUser={data.user.id === userContext?.id}
              loggedIn={!!userContext}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
