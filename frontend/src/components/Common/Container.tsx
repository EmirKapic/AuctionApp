import { PropsWithChildren } from "react";
import { className } from "services/ClassName";

/*I have noticed we have a lot of surrounding divs used as containers with these exact same css styles
so we will use this to wrap and reduce code

Additionally this component allows easy responsivity
By simply applying different max-w at different breakpoints (something similar to what bootstrap does)
as well as different size containers

*/

type ContainerType = "large" | "small";

export interface ContainerProps {
  type: ContainerType;
  className?: string;
}

const containerClassName: Record<ContainerType, string> = {
  large: "max-w-container-lg",
  small: "max-w-container-sm",
};

export default function Container(props: PropsWithChildren<ContainerProps>) {
  return (
    <div
      className={className(
        containerClassName[props.type],
        "w-full mx-auto",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
