import ProductImage from "models/ProductImage";
import { useState } from "react";

export interface ProductImagesProps {
  images: Array<ProductImage>;
}

export default function ProductImages(props: ProductImagesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const productImages = props.images.map((image, index) => (
    <button className="h-full" onClick={() => setSelectedIndex(index)}>
      <img className="object-cover h-full" src={image.url} />
    </button>
  ));
  return (
    <div>
      <div className="h-112 w-104 mb-5">{productImages[selectedIndex]}</div>

      <div className="grid grid-cols-4 gap-4 h-32">
        {productImages.filter((image, index) => index !== selectedIndex)}
      </div>
    </div>
  );
}
