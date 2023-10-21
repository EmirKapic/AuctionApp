import ProductGrid from "components/Common/ProductGrid";
import useFetchPage from "hooks/useFetchPage";
import { ReactNode, useEffect, useState } from "react";
import UrlBuilder from "services/UrlBuilder";
import { defaultPageSize } from "constants";
import Product from "models/Product";

export default function SpecialOffers() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [pageRecent, setPageRecent] = useState(0);
  const [pageExpiring, setPageExpiring] = useState(0);

  const { data: newProducts, isLoading: isLoadingNew } = useFetchPage<Product>(
    new UrlBuilder().products().url,
    pageRecent,
    defaultPageSize,
    "dateStart,desc",
  );

  const { data: lastChanceProducts, isLoading: isLoadingLastChance } =
    useFetchPage<Product>(
      new UrlBuilder().products().url,
      pageExpiring,
      defaultPageSize,
      "dateEnd,asc",
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
      if (selectedTab === 1 && !newProducts.last) {
        setPageRecent(pageRecent + 1);
      } else if (selectedTab === 2 && !lastChanceProducts.last)
        setPageExpiring(pageExpiring + 1);
    }

    //when we add 3rd tab add it here
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
  });

  return (
    <section className="max-w-container-lg w-full mx-auto pb-10">
      <section className="flex border-b-2 border-slate-200 [&>*]:px-5 [&>*]:py-2 text-lg mb-5">
        {renderTabButton("New Arrivals", 1)}
        {renderTabButton("Last Chance", 2)}
      </section>

      {!isLoadingNew &&
        selectedTab === 1 &&
        renderProductGrid(newProducts.content)}

      {!isLoadingLastChance &&
        selectedTab === 2 &&
        renderProductGrid(lastChanceProducts.content)}
    </section>
  );
}
