import { PropsWithChildren } from "react";
import Container from "./Container";

export type AlertType = "warning" | "success";

export interface AlertMessageProps {
  type: AlertType;
}

const classNames: Record<AlertType, { body: string; text: string }> = {
  success: { body: "bg-green-100", text: "font-bold text-green-700" },
  warning: {
    body: "bg-amber-100 bg-opacity-50",
    text: "font-bold text-amber-600",
  },
};

export default function AlertMessage(
  props: PropsWithChildren<AlertMessageProps>,
) {
  return (
    <div className={"w-full py-5 " + classNames[props.type].body}>
      <Container type="large">
        <div className={classNames[props.type].text}>{props.children}</div>
      </Container>
    </div>
  );
}
