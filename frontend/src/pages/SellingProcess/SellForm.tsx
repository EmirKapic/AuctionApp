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

const addItemIds = {
  titleId: "ProductTitle",
  descriptionId: "productDescription",
};
const pricesIds = {
  startPriceId: "StartPriceId",
  startDateId: "startDateId",
  endDateId: "endDateId",
};
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

export type FormState = {
  images: ImageFile[];
  selectedCategory?: CategoryDto;
  selectedSubcategory?: Subcategory;
  selectorsWarningMessage?: string;
  imagesWarningMessage?: string;
  startDate: Date | null;
  endDate: Date | null;
  datesWarningText?: string;
};

const INITIAL: FormState = {
  images: [],
  startDate: null,
  endDate: null,
};

const btnClassName = "py-2 px-8 uppercase";

export default function SellForm() {
  const { data } = useFetchAll<CategoryDto>(new UrlBuilder().categories().url);
  const navigate = useNavigate();

  const [formState, setFormState] = useState<FormState>(INITIAL);
  function updateFields(fields: Partial<FormState>): void {
    setFormState({ ...formState, ...fields });
  }
  const { step, stepIndex, next, back, isFirstStep, isLastStep } =
    useMultistepForm([
      <ItemInfo
        {...addItemIds}
        {...formState}
        categories={data}
        updateFields={updateFields}
      />,
      <Prices {...pricesIds} {...formState} updateFields={updateFields} />,
      <ShippingInfo {...shippingIds} />,
    ]);

  function validateFirstStep(): boolean {
    if (!formState.selectedCategory || !formState.selectedSubcategory) {
      setFormState({
        ...formState,
        selectorsWarningMessage: "Please select a category and a subcategory",
      });
      return false;
    }
    if (formState.images.length < 0) {
      setFormState({
        ...formState,
        imagesWarningMessage: "Please upload at least 3 photos",
      });
      return false;
    }
    setFormState({
      ...formState,
      selectorsWarningMessage: undefined,
      imagesWarningMessage: undefined,
    });
    return true;
  }

  function validateSecondStep(): boolean {
    if (!formState.startDate || !formState.endDate) {
      setFormState({
        ...formState,
        datesWarningText: "Please choose a start date and an end date",
      });
      return false;
    } else if (formState.startDate.getTime() >= formState.endDate.getTime()) {
      setFormState({
        ...formState,
        datesWarningText: "End date cannot be earlier than start date",
      });
      return false;
    } else {
      setFormState({
        ...formState,
        datesWarningText: undefined,
      });
      return true;
    }
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
            console.log(
              data,
              formState.selectedCategory,
              formState.selectedSubcategory,
            );
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
                    if (
                      (stepIndex === 0 && !validateFirstStep()) ||
                      (stepIndex === 1 && !validateSecondStep())
                    ) {
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
