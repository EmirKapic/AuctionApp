import DragAndDrop from "components/Common/DragAndDrop";
import Input from "components/Common/Input";
import CategoryDto from "models/CategoryDto";
import Subcategory from "models/Subcategory";
import { requiredFieldsOptions } from "services/UseFormValidators";
import Icon from "svgs/Icon";
import Select from "react-select";
import TextArea from "components/Common/TextArea";

export type ImageFile = string | ArrayBuffer | null;

export type ItemInfoFields = {
  titleId: string;
  descriptionId: string;
  categories: CategoryDto[];
  selectedCategory?: CategoryDto;
  selectedSubcategory?: Subcategory;
  imagePaths: File[];
  selectorsWarningMessage?: string;
  imagesWarningMessage?: string;
};

export type ItemInfoProps = ItemInfoFields & {
  updateFields: (fields: Partial<ItemInfoFields>) => void;
};

export default function ItemInfo(props: ItemInfoProps) {
  function onFileDrop(files: Array<File>): void {
    props.updateFields({ imagePaths: [...props.imagePaths, files[0]] });
  }

  const images = props.imagePaths.map((img, index) => (
    <div className="border border-silver relative" key={index}>
      <button
        className="absolute top-1 right-1 border rounded-2xl bg-lightgrey-200 bg-opacity-20 backdrop-blur"
        onClick={(e) => {
          e.stopPropagation();
          props.updateFields({
            imagePaths: props.imagePaths.filter((img, indx) => indx !== index),
          });
        }}
        type="button"
      >
        <Icon name="plus" />
      </button>
      <img src={URL.createObjectURL(img)} className="w-20 h-20 object-cover" />
    </div>
  ));

  return (
    <div className="flex flex-col gap-4">
      <Input
        id={props.titleId}
        label="What do you sell?"
        type="text"
        validationOptions={requiredFieldsOptions(
          "Please enter your product's title",
        )}
      />
      <div className="grid grid-cols-2 gap-3 mt-3">
        <Select
          value={
            props.selectedCategory
              ? {
                  value: props.selectedCategory,
                  label: props.selectedCategory?.name,
                }
              : undefined
          }
          onChange={(data) => {
            props.updateFields({
              selectedCategory: data?.value,
              selectedSubcategory: undefined,
            });
          }}
          placeholder="Choose a category"
          options={props.categories.map((cat) => {
            return { value: cat, label: cat.name };
          })}
        />

        <Select
          value={
            props.selectedSubcategory
              ? {
                  value: props.selectedSubcategory,
                  label: props.selectedSubcategory?.name,
                }
              : undefined
          }
          onChange={(data) =>
            props.updateFields({ selectedSubcategory: data?.value })
          }
          placeholder="Choose a subcategory"
          options={
            props.selectedCategory?.subCategories.map((subCat) => {
              return { value: subCat, label: subCat.name };
            }) || []
          }
          isDisabled={!props.selectedCategory}
        />
      </div>
      <div className="text-red-500">{props.selectorsWarningMessage}</div>
      <div>
        <TextArea
          id={props.descriptionId}
          label="Description"
          rows={7}
          maxLength={700}
          validationOptions={{
            ...requiredFieldsOptions("Please enter your product's description"),
            maxLength: {
              value: 700,
              message: "Maximum length is 700 characters",
            },
          }}
        />
        <p className="text-right text-lightgrey-200">
          Max. 100 words (700 characters)
        </p>
      </div>

      <DragAndDrop
        onDrop={onFileDrop}
        className="mt-3 w-full aspect-video border relative p-3 cursor-pointer"
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
      <div className="text-red-500 mt-1">{props.imagesWarningMessage}</div>
    </div>
  );
}
