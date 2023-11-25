import { FormEvent, PropsWithChildren } from "react";
import Container from "./Container";

export interface FormProps {
  title: string;
  onSubmit: (e: FormEvent) => void;
}

export default function Form(props: PropsWithChildren<FormProps>) {
  return (
    <Container
      type="small"
      className="m-5 border border-silver border-opacity-50"
    >
      <div className="text-center uppercase text-2xl bg-lightgrey-100 py-3">
        {props.title}
      </div>
      <form
        onSubmit={props.onSubmit}
        className="flex flex-col gap-10 py-8 px-12"
        noValidate
      >
        {props.children}
      </form>
    </Container>
  );
}
