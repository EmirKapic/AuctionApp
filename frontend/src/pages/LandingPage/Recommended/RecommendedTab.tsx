import Container from "components/Common/Container";
import ProductGrid from "components/Common/ProductGrid";
import useFetchAll from "hooks/useFetchAll";
import Product from "models/Product";
import UrlBuilder from "services/UrlBuilder";

export default function RecommendedTab() {
  const { data, isLoading, isError } = useFetchAll<Product>(
    new UrlBuilder().products().recommended().url,
  );

  if (isError) {
    return (
      <div className="text-center text-xl text-pink-700">
        There was an error fetching products...
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="text-center text-xl text-purple">Loading products...</div>
    );
  }
  return (
    <Container type="large" className="flex flex-col gap-5 mb-10">
      <div className="font-bold text-2xl tracking-wide border-b border-b-silver pb-4">
        Recommended Products
      </div>
      <ProductGrid
        items={data}
        itemsClassName="grid grid-cols-3 gap-5"
        imageClassName="w-92 h-80"
      />
    </Container>
  );
}
