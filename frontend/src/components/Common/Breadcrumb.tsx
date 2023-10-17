import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  title: string;
  to?: string;
}

export interface BreadcrumbProps {
  title: string;
  items: Array<BreadcrumbItem>;
}

export default function Breadcrumb(props: BreadcrumbProps) {
  const navigate = useNavigate();

  function handleRouteClick(to: string | undefined): void {
    if (!to) return;
    navigate(to);
  }

  const breadcrumbPath = props.items.map((item, index) => {
    const lastIndex = index === props.items.length - 1;
    return (
      <h3
        className={
          "opacity-60 font-light text-lg uppercase text-black" +
          (lastIndex ? " font-normal" : " cursor-pointer pr-2")
        }
        onClick={() => handleRouteClick(item.to)}
      >
        {item.title + (!lastIndex ? " / " : " ")}
      </h3>
    );
  });

  return (
    <aside className="w-full bg-lightgrey-100">
      <div className="w-full max-w-container-lg mx-auto flex justify-between py-5">
        <h3 className="tracking-wider text-lg uppercase">{props.title}</h3>
        <div className="flex text-base">{breadcrumbPath}</div>
      </div>
    </aside>
  );
}
