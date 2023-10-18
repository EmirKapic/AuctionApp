import Grid from "components/Common/Grid";
import useFetchPage from "hooks/useFetchPage";
import { useState } from "react";
import UrlBuilder from "services/UrlBuilder";

export default function SpecialOffers() {
  const [selectedTab, setSelectedTab] = useState(1);

  const { data: newProducts, isLoading: isLoadingNew } = useFetchPage(
    new UrlBuilder().products().recent().url,
    0,
    8,
  );

  const { data: lastChanceProducts, isLoading: isLoadingLastChance } =
    useFetchPage(new UrlBuilder().products().lastchance().url, 0, 8);

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
