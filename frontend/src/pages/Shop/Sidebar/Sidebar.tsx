import { PropsWithChildren } from "react";

export interface SidebarProps {
  title?: string;
  className?: string;
}

export default function Sidebar(props: PropsWithChildren<SidebarProps>) {
  return (
    <aside className="py-5 px-5 border border-silver">
      <h1 className="uppercase text-purple font-bold text-left pr-16 text-sm pb-4">
        {props.title}
      </h1>
      <section className={props.className}>{props.children}</section>
    </aside>
  );
}
