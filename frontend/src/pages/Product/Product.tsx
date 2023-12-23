import Breadcrumb from "components/Common/Breadcrumb";
import useFetchOne from "hooks/useFetchOne";
import { useParams } from "react-router-dom";
import UrlBuilder from "services/UrlBuilder";
import ProductModel from "models/Product";
import Container from "components/Common/Container";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import Bid from "models/Bid";
import { useContext, useEffect, useMemo } from "react";
import { UserContext } from "contexts/UserContext";
import AlertMessage from "components/Common/AlertMessage";
import useFetchPage, { Sort } from "hooks/useFetchPage";
import UserInteractionService from "services/UserInteractionService";
import RelatedProducts from "./RelatedProducts";

const url = new UrlBuilder().bids().url;

const sort: Sort = {
  name: "bid",
  order: "desc",
};

export default function Product() {
  const { id } = useParams();
  const userContext = useContext(UserContext);
  const {
    data,
    isLoading,
    isError,
    refresh: refreshProductData,
  } = useFetchOne<ProductModel>(
    new UrlBuilder().products().id(parseInt(id!)).url,
  );

  const params = useMemo(() => {
    const searchParams = new URLSearchParams();
    searchParams.append("productId", id!);
    return searchParams;
  }, [userContext]);

  const { data: userBid, refresh: refreshUserBid } = useFetchPage<Bid>(
    url,
    0,
    1,
    sort,
    params,
  );

  useEffect(() => {
    if (userContext && data && userContext.id !== data.user.id) {
      UserInteractionService.updateInteractions(data);
    }
  }, [data, userContext]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError || !data) {
    return <div>Error while loading product...</div>;
  }
  const highestBidder = data.highestBid === userBid?.content[0]?.bid || false;
  const auctionFinished = new Date(data.dateEnd) < new Date();
  return (
    <div className="w-full">
      <Breadcrumb
        title={data.name}
        items={[{ title: "Shop", to: "/shop" }, { title: "Single product" }]}
      />
      {userBid.content[0] && !auctionFinished && !data.purchased && (
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
              auctionFinished={auctionFinished}
              refreshData={() => {
                refreshUserBid();
                refreshProductData();
              }}
            />
          </div>
        </div>
        {data && <RelatedProducts productId={data.id} />}
      </Container>
    </div>
  );
}
