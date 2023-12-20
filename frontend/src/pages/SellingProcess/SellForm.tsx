import Breadcrumb from "components/Common/Breadcrumb";
import useMultistepForm from "hooks/useMultistepForm";
import ItemInfo from "./ItemInfo";
import Prices from "./Prices";
import ShippingInfo, { ShippingInfoProps } from "./ShippingInfo";
import Form from "components/Common/Form";
import Button from "components/Common/Button";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useFetchAll from "hooks/useFetchAll";
import UrlBuilder from "services/UrlBuilder";
import CategoryDto from "models/CategoryDto";
import { useState } from "react";
import Subcategory from "models/Subcategory";
import Product from "models/Product";
import post from "services/fetching/Post";
import FileManager from "services/fileManaging/FileManager";
import FirebaseFileManager from "services/fileManaging/FirebaseFileManager";
import { className } from "services/ClassName";

export type NewProductRequest = {
  title: string;
  categoryId: number;
  subcategoryId: number;
  description: string;
  imageUrls: string[];
  startPrice: number;
  startDate: string;
  endDate: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
};

const addItemIds = {
  titleId: "ProductTitle",
  descriptionId: "ProductDescription",
};
const pricesIds = {
  startPriceId: "StartPrice",
  startDateId: "StartDate",
  endDateId: "EndDate",
};
const shippingIds: ShippingInfoProps = {
  addressId: "AddressInput",
  cityId: "City",
  zipId: "ZipCode",
  countryId: "Country",
  phoneId: "PhoneNumber",
};

const titleMap: Record<number, string> = {
  0: "Add item",
  1: "Set prices",
  2: "Location and shipping",
};

export type FormState = {
  imagePaths: File[];
  selectedCategory?: CategoryDto;
  selectedSubcategory?: Subcategory;
  selectorsWarningMessage?: string;
  imagesWarningMessage?: string;
  startDate: Date | null;
  endDate: Date | null;
  datesWarningText?: string;
};

const INITIAL: FormState = {
  imagePaths: [],
  startDate: null,
  endDate: null,
};

const btnClassName = "py-2 px-8 uppercase";

export default function SellForm() {
  const { data } = useFetchAll<CategoryDto>(new UrlBuilder().categories().url);
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>(INITIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (formState.imagePaths.length < 3) {
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

  const stepValidations = [validateFirstStep, validateSecondStep];

  function validateStep(stepIndex: number): boolean {
    return stepValidations[stepIndex]();
  }

  const methods = useForm();

  async function onFormSubmit(data: FieldValues): Promise<void> {
    setIsSubmitting(true);
    const fileManager: FileManager = new FirebaseFileManager();
    const uploadPromises = formState.imagePaths.map(
      async (path) => await fileManager.uploadFile(path),
    );
    const givenUrls = await Promise.all(uploadPromises);

    const newProduct: NewProductRequest = {
      title: data[addItemIds.titleId],
      categoryId: formState.selectedCategory!.id,
      subcategoryId: formState.selectedSubcategory!.id,
      description: data[addItemIds.descriptionId],
      imageUrls: givenUrls,
      startPrice: data[pricesIds.startPriceId],
      startDate: formState.startDate!.toISOString(),
      endDate: formState.endDate!.toISOString(),
      address: data[shippingIds.addressId],
      zipCode: data[shippingIds.zipId],
      city: data[shippingIds.cityId],
      country: data[shippingIds.countryId],
      phoneNumber: data[shippingIds.phoneId],
    };
    const url = new UrlBuilder().products().url;
    post<Product, NewProductRequest>(url, newProduct).then((p) =>
      navigate(`/shop/products/${p.data.id}`),
    );
  }

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
            onFormSubmit(data);
          })}
        >
          {step}
          {isSubmitting ? (
            <p className="text-center text-xl font-bold">Submitting...</p>
          ) : (
            <div className="flex justify-between">
              <Button
                type="secondary"
                className={className(
                  btnClassName,
                  "hover:bg-lightgrey-200 hover:bg-opacity-40 duration-300",
                )}
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
                {isLastStep ? (
                  <Button
                    key="finishBtn"
                    type="primary-filled"
                    className={className(
                      btnClassName,
                      "hover:bg-opacity-70 duration-300",
                    )}
                    formButtonType="submit"
                  >
                    Finish
                  </Button>
                ) : (
                  <Button
                    key="nextBtn"
                    type="primary-filled"
                    className={className(
                      btnClassName,
                      "hover:bg-opacity-70 duration-300",
                    )}
                    onClick={(e) => {
                      if (!validateStep(stepIndex)) {
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
          )}
        </Form>
      </FormProvider>
    </div>
  );
}
