import { PropsWithChildren } from "react";
import { useDropzone } from "react-dropzone";

export interface DragAndDropProps {
  onDrop: (acceptedFiles: Array<File>) => void;
  className?: string;
}

export default function DragAndDrop(
  props: PropsWithChildren<DragAndDropProps>,
) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: props.onDrop,
  });
  return (
    <div {...getRootProps()} className={props.className}>
      <input {...getInputProps()} id="drop" />
      {props.children}
    </div>
  );
}
