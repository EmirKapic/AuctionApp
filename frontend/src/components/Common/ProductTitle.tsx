export interface ProductTitleProps {
  title: string;
  startPrice: number;
}

export default function ProductTitle(props: ProductTitleProps) {
  return (
    <section>
      <h1 className="text-5xl font-normal text-grey_">{props.title}</h1>
      <h3 className="text-2xl py-4 text-purple font-light">
        Start From - ${props.startPrice.toFixed(2)}
      </h3>
    </section>
  );
}
