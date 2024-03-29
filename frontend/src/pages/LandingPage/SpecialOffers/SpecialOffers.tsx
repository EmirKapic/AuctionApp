import ProductGrid from "components/Common/ProductGrid";
import useFetchPage, { Sort } from "hooks/useFetchPage";
import { ReactNode, useEffect, useState } from "react";
import UrlBuilder from "services/UrlBuilder";
import { defaultPageSize, maxPagesSpecialOffers } from "defaultConstants";
import Product from "models/Product";
import Container from "components/Common/Container";

const recentSort: Sort = {
  name: "dateStart",
  order: "desc",
};

const expiringSort: Sort = {
  name: "dateEnd",
  order: "asc",
};

const activeParams = new URLSearchParams();
activeParams.append("active", "true");
activeParams.append("excludeUserOwned", "true");

export default function SpecialOffers() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [pageRecent, setPageRecent] = useState(0);
  const [pageExpiring, setPageExpiring] = useState(0);

  const {
    data: newProducts,
    isLoading: isLoadingNew,
    isError: errorNew,
  } = useFetchPage<Product>(
    new UrlBuilder().products().url,
    pageRecent,
    defaultPageSize,
    recentSort,
    activeParams,
  );

  const {
    data: lastChanceProducts,
    isLoading: isLoadingLastChance,
    isError: errorLastChance,
  } = useFetchPage<Product>(
    new UrlBuilder().products().url,
    pageExpiring,
    defaultPageSize,
    expiringSort,
    activeParams,
  );

  function renderTabButton(title: string, tabNumber: number): ReactNode {
    return (
      <button
        className={
          selectedTab === tabNumber ? "border-b-4 border-purple font-bold" : ""
        }
        onClick={() => setSelectedTab(tabNumber)}
      >
        {title}
      </button>
    );
  }

  function renderProductGrid(items: Product[]): ReactNode {
    return (
      <ProductGrid
        itemsClassName="grid grid-cols-4 gap-5"
        imageClassName="w-72 h-72"
        items={items}
        type="vertical"
      />
    );
  }

  const handleScroll = () => {
    if (
      (selectedTab === 1 && isLoadingNew) ||
      (selectedTab === 2 && isLoadingLastChance)
    )
      return;

    if (
      document.documentElement.scrollHeight - 10 <=
      Math.floor(window.scrollY + window.innerHeight)
    ) {
      if (
        selectedTab === 1 &&
        !newProducts.last &&
        pageRecent < maxPagesSpecialOffers
      ) {
        setPageRecent(pageRecent + 1);
      } else if (
        selectedTab === 2 &&
        !lastChanceProducts.last &&
        pageExpiring < maxPagesSpecialOffers
      )
        setPageExpiring(pageExpiring + 1);
    }

    //when we add 3rd tab add it here
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
  }, [newProducts, lastChanceProducts]);

  return (
    <Container className="pb-10" type="large">
      <section className="flex border-b-2 border-slate-200 [&>*]:px-5 [&>*]:py-2 text-lg mb-5">
        {renderTabButton("New Arrivals", 1)}
        {renderTabButton("Last Chance", 2)}
      </section>

      {selectedTab === 1 && renderProductGrid(newProducts.content)}

      {selectedTab === 2 && renderProductGrid(lastChanceProducts.content)}

      {(isLoadingLastChance || isLoadingNew) && (
        <div className="text-center font-bold text-2xl py-5">
          Loading more....
        </div>
      )}

      {(errorNew || errorLastChance) && (
        <div className="text-center font-bold text-2xl py-5">
          Error fetching data...
        </div>
      )}
    </Container>
  );
}
