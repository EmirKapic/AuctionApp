import Breadcrumb from "components/Common/Breadcrumb";
import useMultistepForm from "hooks/useMultistepForm";
import ItemInfo from "./ItemInfo";
import Prices from "./Prices";
import ShippingInfo, { ShippingInfoProps } from "./ShippingInfo";
import Form from "components/Common/Form";
import Button from "components/Common/Button";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const addItemIds = ["ProductTitle"];
const pricesIds = [];
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
  const navigate = useNavigate();
  const { step, stepIndex, next, back, isFirstStep, isLastStep } =
    useMultistepForm([
      <ItemInfo titleId={addItemIds[0]} />,
      <Prices />,
      <ShippingInfo {...shippingIds} />,
    ]);
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
          onSubmit={methods.handleSubmit((data) => console.log(data))}
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
                  onClick={() => {
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
