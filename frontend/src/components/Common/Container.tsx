export interface ContainerProps {
  children: JSX.Element;
}

export default function Container(props: ContainerProps) {
  return (
    <div className="max-w-container-lg w-full mx-auto">{props.children}</div>
  );
}
