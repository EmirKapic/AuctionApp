import DragAndDrop from "components/Common/DragAndDrop";
import Input from "components/Common/Input";
import CategoryDto from "models/CategoryDto";
import Subcategory from "models/Subcategory";
import { requiredFieldsOptions } from "services/UseFormValidators";
import Icon from "svgs/Icon";
import Select from "react-select";

export type ImageFile = string | ArrayBuffer | null;

export interface ItemInfoProps {
  titleId: string;
  categories: CategoryDto[];
  uploadedImages: ImageFile[];
  handleUploadImage: (image: ImageFile) => void;
  handleCancelImage: (imageIndex: number) => void;
  selectedCategory: CategoryDto | undefined;
  onCategorySelect: (newCategory?: CategoryDto) => void;
  selectedSubcategory: Subcategory | undefined;
  onSubcategorySelect: (newSubcategory?: Subcategory) => void;
  selectorsWarningMessage?: string;
  imagesWarningMessage?: string;
}

export default function ItemInfo(props: ItemInfoProps) {
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

  console.log(props.selectedCategory, props.selectedSubcategory);

  return (
    <div>
      <Input
        id={props.titleId}
        label="What do you sell?"
        type="text"
        validationOptions={requiredFieldsOptions("You must enter a name")}
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
            props.onCategorySelect(data?.value);
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
          onChange={(data) => props.onSubcategorySelect(data?.value)}
          placeholder="Choose a subcategory"
          options={
            props.selectedCategory?.subCategories.map((subCat) => {
              return { value: subCat, label: subCat.name };
            }) || []
          }
          isDisabled={!props.selectedCategory}
        />
      </div>
      <div className="text-red-500 mt-1">{props.selectorsWarningMessage}</div>

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
