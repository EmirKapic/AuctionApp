import ProductImage from "models/ProductImage";
import { useState } from "react";

export interface ProductImagesProps {
  images: Array<ProductImage>;
}

export default function ProductImages(props: ProductImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const productImages = props.images.map((image, index) => (
    <button className="h-full" onClick={() => setSelectedIndex(index)}>
      <img
        className="object-cover h-full"
        src={image.url}
        alt="Product image"
      />
    </button>
  ));
  return (
    <div>
      <div className="h-[480px] w-[420px] mb-5">
        {productImages[selectedIndex]}
      </div>

      <div className="grid grid-cols-4 gap-4 h-32">{productImages}</div>
    </div>
  );
}
