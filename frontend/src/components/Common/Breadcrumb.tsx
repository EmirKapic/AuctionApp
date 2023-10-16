import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  title: string;
  to?: string;
}

interface BreadcrumbProps {
  title: string;
  items: Array<BreadcrumbItem>;
}

export default function Breadcrumb(props: BreadcrumbProps) {
  const navigate = useNavigate();

  function handleRouteClick(to: string | undefined) {
    if (!to) return;
    navigate(to);
  }

  const breadcrumbPath = props.items.map((item, index) => {
    const lastIndex = index === props.items.length - 1;
    return (
      <h3
        className={
          "text-grey_ opacity-60 font-light text-md uppercase " +
          (lastIndex ? " font-bold" : " cursor-pointer pr-1")
        }
        onClick={() => handleRouteClick(item.to)}
      >
        {item.title + (!lastIndex ? " / " : " ")}
      </h3>
    );
  });

  return (
    <aside className="w-full bg-lightgrey-100">
      <div className="w-full max-w-[1280px] mx-auto flex justify-between py-5">
        <h3 className="tracking-wider text-lg uppercase">{props.title}</h3>
        <div className="flex text-base">{breadcrumbPath}</div>
      </div>
    </aside>
  );
}
