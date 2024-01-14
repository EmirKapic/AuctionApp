import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "svgs/Icon";

export default function FiltersList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  function onFilterCancel(paramName: string): void {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(paramName);
    setSearchParams(newSearchParams);
  }

  function filterItem(title: string, cancelFilter: () => void): ReactNode {
    return (
      <div
        className="border border-silver bg-purple bg-opacity-50 rounded-full pl-4 pr-2 text-white flex gap-2
        hover:bg-opacity-70"
      >
        {title}
        <button onClick={cancelFilter}>
          <Icon name="cancel" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-5 pb-3">
      {minPrice &&
        filterItem(`Min price: $${minPrice}`, () => onFilterCancel("minPrice"))}
      {maxPrice &&
        filterItem(`Max price : $${maxPrice}`, () =>
          onFilterCancel("maxPrice"),
        )}
    </div>
  );
}
