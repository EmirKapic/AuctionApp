import Button from "components/Common/Button";
import ProductGrid from "components/Common/ProductGrid";
import Page from "models/Page";
import Product from "models/Product";
import { MouseEventHandler } from "react";

type ProductListType = "grid" | "list";

const productListClassName: Record<ProductListType, string> = {
  grid: "grid grid-cols-3 gap-5",
  list: " ",
};

export interface ProductListProps {
  items: Page<Product>;
  type: ProductListType;
  handleNextPage: MouseEventHandler<HTMLButtonElement>;
}

export default function ProductList(props: ProductListProps) {
  return (
    <div className="pb-4">
      <div>
        <ProductGrid
          itemsClassName={productListClassName[props.type]}
          imageClassName="w-full h-96"
          items={props.items.content}
        />
      </div>
      {!props.items.last && (
        <div className="pt-10 pb-4">
          <Button
            type="primary-filled"
            className="mx-auto px-16 py-4"
            onClick={props.handleNextPage}
          >
            Explore more
          </Button>
        </div>
      )}
    </div>
  );
}
