import DragAndDrop from "components/Common/DragAndDrop";
import Input from "components/Common/Input";
import Select from "components/Common/Select";
import CategoryDto from "models/CategoryDto";
import { useState } from "react";
import { requiredFieldsOptions } from "services/UseFormValidators";
import Icon from "svgs/Icon";

export type ImageFile = string | ArrayBuffer | null;

export interface ItemInfoProps {
  titleId: string;
  categories: CategoryDto[];
  uploadedImages: ImageFile[];
  handleUploadImage: (image: ImageFile) => void;
  handleCancelImage: (imageIndex: number) => void;
}

export default function ItemInfo(props: ItemInfoProps) {
  const categoryNames = props.categories.map((cat) => cat.name);

  const fileReader = new FileReader();
  fileReader.onload = () => {
    props.handleUploadImage(fileReader.result);
  };

  function onFileDrop(files: Array<File>): void {
    fileReader.readAsDataURL(files[0]);
  }

  const images = props.uploadedImages.map((img, index) => (
    <div className="border border-silver relative">
      <button
        className="absolute top-1 right-1 border rounded-2xl bg-lightgrey-200 bg-opacity-20 backdrop-blur"
        onClick={(e) => {
          e.stopPropagation();
          props.handleCancelImage(index);
        }}
        type="button"
      >
        <Icon name="plus" />
      </button>
      <img src={img as string} className="w-20 h-20 object-cover" />
    </div>
  ));

  return (
    <div className="z-0 relative">
      <Input
        id={props.titleId}
        label="What do you sell?"
        type="text"
        validationOptions={requiredFieldsOptions("You must enter a name")}
      />
      <div className="grid grid-cols-2 gap-3">
        <Select
          items={categoryNames}
          placeholder="Select category"
          className="mt-5"
          onChange={(selectedItem) => console.log(selectedItem)}
        />
        <Select
          items={categoryNames}
          placeholder="Select subcategory"
          className="mt-5"
          onChange={(selectedItem) => console.log(selectedItem)}
          disabled
        />
      </div>

      <DragAndDrop
        onDrop={onFileDrop}
        className="mt-3 w-full aspect-video border relative p-3"
      >
        <div className="flex flex-wrap gap-3">{images}</div>
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <h3 className="text-purple font-bold text-2xl">
            Click To Upload Photos
          </h3>
          <p className="text-lg">or just drag and drop</p>
          <p className="text-lightgrey-200 text-sm">(Add at least 3 photos)</p>
        </div>
      </DragAndDrop>
    </div>
  );
}
