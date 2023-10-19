import { useState } from "react";

export default function ProductImages() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const productImages: JSX.Element[] = [];

  //This part will not exist when product images are in database
  //this is simply to simulate an array of images
  for (let i = 0; i < 7; i++) {
    if (i % 2 === 0) {
      productImages.push(
        <button
          className="cursor-pointer h-full"
          onClick={() => setSelectedIndex(i)}
        >
          <img
            className="object-cover h-full"
            src="https://wallpaperset.com/w/full/7/7/d/66277.jpg"
          ></img>
        </button>,
      );
    } else {
      productImages.push(
        <button
          className="cursor-pointer h-full"
          onClick={() => setSelectedIndex(i)}
        >
          <img
            className="object-cover h-full"
            src="https://content-management-files.canva.com/cdn-cgi/image/f=auto,q=70/2fdbd7ab-f378-4c63-8b21-c944ad2633fd/header_t-shirts2.jpg"
          ></img>
        </button>,
      );
    }
  }

  return (
    <div className="p-12 h-full pb-20">
      <div className="h-96 w-full mb-5">{productImages[selectedIndex]}</div>

      <div className="grid grid-cols-4 gap-4 h-32">
        {productImages.filter((image, index) => index !== selectedIndex)}
      </div>
    </div>
  );
}
