import Breadcrumb from "components/Common/Breadcrumb";
import useMultistepForm from "hooks/useMultistepForm";
import ItemInfo, { ImageFile } from "./ItemInfo";
import Prices from "./Prices";
import ShippingInfo, { ShippingInfoProps } from "./ShippingInfo";
import Form from "components/Common/Form";
import Button from "components/Common/Button";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useFetchAll from "hooks/useFetchAll";
import UrlBuilder from "services/UrlBuilder";
import CategoryDto from "models/CategoryDto";
import { useState } from "react";
import Subcategory from "models/Subcategory";
//make this an pbject too
const addItemIds = {
  titleId: "ProductTitle",
  descriptionId: "productDescription",
};
const pricesIds = ["StartPriceId"];
const shippingIds: ShippingInfoProps = {
  addressId: "addressInput",
  emailId: "Email",
  cityId: "City",
  zipId: "Zip Code",
  countryId: "Country",
  phoneId: "PhoneNumber",
};

const titleMap: Record<number, string> = {
  0: "Add item",
  1: "Set prices",
  2: "Location and shipping",
};

const btnClassName = "py-2 px-8 uppercase";

export default function SellForm() {
  const { data } = useFetchAll<CategoryDto>(new UrlBuilder().categories().url);
  const navigate = useNavigate();
  //First form state
  const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>();
  const [categorySelectWarning, setCategorySelectWarning] = useState<string>();
  const [imagesWarningText, setImagesWarningText] = useState<string>();

  const { step, stepIndex, next, back, isFirstStep, isLastStep } =
    useMultistepForm([
      <ItemInfo
        {...addItemIds}
        categories={data}
        uploadedImages={uploadedImages}
        handleUploadImage={(file) =>
          setUploadedImages([...uploadedImages, file])
        }
        handleCancelImage={handleRemoveImage}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onCategorySelect={(cat) => {
          setSelectedCategory(cat);
          setSelectedSubcategory(cat?.subCategories[0]);
        }}
        onSubcategorySelect={setSelectedSubcategory}
        selectorsWarningMessage={categorySelectWarning}
        imagesWarningMessage={imagesWarningText}
      />,
      <Prices
        startPriceId="startPrice"
        startDateId="startDate"
        endDateId="endDate"
      />,
      <ShippingInfo {...shippingIds} />,
    ]);

  function handleRemoveImage(imgIndex: number) {
    setUploadedImages(
      uploadedImages.filter((img, index) => index !== imgIndex && img),
    );
  }

  function validateFirstStep(): boolean {
    let valid = true;
    if (!selectedCategory || !selectedSubcategory) {
      setCategorySelectWarning("Please select a category and a subcategory");
      valid = false;
    } else {
      setCategorySelectWarning(undefined);
    }
    if (uploadedImages.length < 0) {
      setImagesWarningText("Please upload at least 3 photos.");
      valid = false;
    } else {
      setImagesWarningText(undefined);
    }
    methods.trigger();
    return valid;
  }
  const methods = useForm();
  return (
    <div>
      <Breadcrumb
        title="Seller"
        items={[{ title: "My accout", to: "/account" }, { title: "Sell item" }]}
      />
      <FormProvider {...methods}>
        <Form
          title={titleMap[stepIndex]}
          onSubmit={methods.handleSubmit((data) => {
            console.log(data, selectedCategory, selectedSubcategory);
          })}
        >
          {step}
          <div className="flex justify-between">
            <Button
              type="secondary"
              className={
                btnClassName +
                " hover:bg-lightgrey-200 hover:bg-opacity-40 duration-300"
              }
              onClick={() => navigate("/account")}
            >
              cancel
            </Button>
            <div className="flex gap-2">
              {!isFirstStep && (
                <Button
                  type="primary"
                  className={btnClassName}
                  onClick={() => back()}
                  formButtonType="button"
                >
                  back
                </Button>
              )}
              {/* obviously, this should be done isLast ? onebtn : otherBtn but if i do it like that
              due to some react shenanigans it submits form when it shouldnt*/}
              {isLastStep && (
                <Button
                  type="primary-filled"
                  className={btnClassName + " hover:bg-opacity-70 duration-300"}
                  formButtonType="submit"
                >
                  Finish
                </Button>
              )}{" "}
              {!isLastStep && (
                <Button
                  type="primary-filled"
                  className={btnClassName + " hover:bg-opacity-70 duration-300"}
                  onClick={(e) => {
                    if (stepIndex === 0 && !validateFirstStep()) {
                      e.stopPropagation();
                      return;
                    }
                    methods.trigger().then((noErrors) => {
                      if (noErrors) next();
                    });
                  }}
                  formButtonType="button"
                >
                  next
                </Button>
              )}
            </div>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}
