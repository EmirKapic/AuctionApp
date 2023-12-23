import ProductGrid from "components/Common/ProductGrid";
import useFetchAll from "hooks/useFetchAll";
import Product from "models/Product";
import UrlBuilder from "services/UrlBuilder";

export interface RelatedProductsProps {
  productId: number;
}

export default function RelatedProducts(props: RelatedProductsProps) {
  const url =
    new UrlBuilder().products().related().id(props.productId).url + "?limit=3";
  const { data } = useFetchAll<Product>(url);
  return (
    <div className="flex flex-col gap-5 mb-10">
      <div className="font-bold text-2xl tracking-wide border-b border-b-silver pb-4">
        Related products
      </div>
      <ProductGrid
        items={data}
        itemsClassName="grid grid-cols-3 gap-5"
        imageClassName="w-96 h-[28rem]"
      />
    </div>
  );
}
