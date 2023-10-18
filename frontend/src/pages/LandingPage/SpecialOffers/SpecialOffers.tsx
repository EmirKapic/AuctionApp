import Grid from "components/Common/Grid";
import useFetchPage from "hooks/useFetchPage";
import { useEffect, useState } from "react";
import UrlBuilder from "services/UrlBuilder";

export default function SpecialOffers() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [pageRecent, setPageRecent] = useState(0);
  const [pageExpiring, setPageExpiring] = useState(0);

  const { data: newProducts, isLoading: isLoadingNew } = useFetchPage(
    new UrlBuilder().products().recent().url,
    pageRecent,
    8,
  );

  const { data: lastChanceProducts, isLoading: isLoadingLastChance } =
    useFetchPage(new UrlBuilder().products().lastchance().url, pageExpiring, 8);

  const handleScroll = () => {
    if (selectedTab === 1 && isLoadingNew) return;

    if (
      document.documentElement.scrollHeight ===
      window.scrollY + window.innerHeight
    ) {
      if (selectedTab === 1) setPageRecent((pageRecent) => pageRecent + 1);
      else if (selectedTab === 2) setPageExpiring(pageExpiring + 1);
    }

    //when we add 3rd tab add it here
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
  });

  return (
    <section className="max-w-container-lg w-full mx-auto pb-10">
      <section className="flex border-b-2 border-slate-200 [&>*]:px-5 [&>*]:py-2 text-lg">
        <button
          className={
            selectedTab === 1 ? "border-b-4 border-purple font-bold" : ""
          }
          onClick={() => setSelectedTab(1)}
        >
          New Arrivals
        </button>
        <button
          className={
            selectedTab === 2 ? "border-b-4 border-purple font-bold" : ""
          }
          onClick={() => setSelectedTab(2)}
        >
          Last Chance
        </button>
      </section>

      {!isLoadingNew && selectedTab === 1 && (
        <Grid
          className="grid grid-cols-4 gap-5"
          items={newProducts!!.content}
        />
      )}

      {!isLoadingLastChance && selectedTab === 2 && (
        <Grid
          className="grid grid-cols-4 gap-5 "
          items={lastChanceProducts!!.content}
        />
      )}
    </section>
  );
}
