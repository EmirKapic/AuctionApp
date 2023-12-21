import Button from "components/Common/Button";
import { ReactNode, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PriceFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();

  function onPriceFilter() {
    const newSearchParams = new URLSearchParams(searchParams);
    if (minPrice) newSearchParams.set("minPrice", minPrice.toString());
    else newSearchParams.delete("minPrice");

    if (maxPrice) newSearchParams.set("maxPrice", maxPrice.toString());
    else newSearchParams.delete("maxPrice");

    setSearchParams(newSearchParams);
  }

  function priceInput(
    value: number | undefined,
    onChange: (newValue: number) => void,
    placeholder: string,
  ): ReactNode {
    return (
      <input
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        type="number"
        placeholder={placeholder}
        className="w-20 border border-silver py-2 text-center"
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-6 items-center">
        {priceInput(minPrice, setMinPrice, "$10")}-
        {priceInput(maxPrice, setMaxPrice, "$1000")}
      </div>
      <Button type="primary" className="py-1" onClick={onPriceFilter}>
        Apply filter
      </Button>
    </div>
  );
}
