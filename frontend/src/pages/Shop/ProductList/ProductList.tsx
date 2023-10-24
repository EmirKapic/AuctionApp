import ProductGrid from "components/Common/ProductGrid";
import Product from "models/Product";

type ProductListType = "grid" | "list";

const productListClassName: Record<ProductListType, string> = {
  grid: "grid grid-cols-3 gap-5",
  list: " ",
};

export interface ProductListProps {
  items: Array<Product>;
  type: ProductListType;
}

export default function ProductList(props: ProductListProps) {
  return (
    <div>
      {props.type === "grid" ? (
        <div>
          <ProductGrid
            itemsClassName={productListClassName[props.type]}
            imageClassName="w-full"
            items={props.items}
          />
        </div>
      ) : (
        <div>Not implemented yet</div>
      )}
    </div>
  );
}
