import BarGraph from "components/Common/BarGraph/BarGraph";
import Button from "components/Common/Button";
import DoubleSlider from "components/Common/DoubleSlider/DoubleSlider";
//import DoubleSlider from "components/Common/DoubleSlider/DoubleSlider";
import useFetchOne from "hooks/useFetchOne";
import ProductExtraInfo from "models/ProductExtraInfo";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UrlBuilder from "services/UrlBuilder";

export default function PriceFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const productExtraInfoParams = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    params.append("numberOfBuckets", "25");
    return params;
  }, [searchParams]);

  const { data } = useFetchOne<ProductExtraInfo>(
    new UrlBuilder().products().extraInfo().url,
    productExtraInfoParams,
  );

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
        onChange={(e) => onChange(parseFloat(e.target.value))}
        type="number"
        placeholder={placeholder}
        className="w-20 border border-silver py-2 text-center"
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {data && (
        <BarGraph
          data={data.buckets.map((bucket) => {
            return {
              size: bucket.count,
              index: bucket.bucketNumber,
            };
          })}
          height={60}
          barColor="#E4E5EC"
          className="border-b border-silver"
          numberOfBars={25}
        />
      )}
      <DoubleSlider
        totalMax={data?.maxPrice || 0}
        totalMin={0}
        setMax={setMaxPrice}
        setMin={setMinPrice}
        min={minPrice}
        max={maxPrice}
      />
      <div className="flex gap-6 items-center">
        {priceInput(minPrice, setMinPrice, "$10")}-
        {priceInput(maxPrice, setMaxPrice, "$1000")}
      </div>
      {data && (
        <div className="flex gap-1 text-lightgrey-200">
          <div>{`$${data.minPrice}`}</div>
          <div>-</div>
          <div>{`$${data.maxPrice}`}</div>
        </div>
      )}

      <Button type="primary" className="py-1" onClick={onPriceFilter}>
        Apply filter
      </Button>
    </div>
  );
}
