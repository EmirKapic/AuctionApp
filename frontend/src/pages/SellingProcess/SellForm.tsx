import Breadcrumb from "components/Common/Breadcrumb";
import useMultistepForm from "hooks/useMultistepForm";
import ItemInfo from "./ItemInfo";
import Prices from "./Prices";
import ShippingInfo from "./ShippingInfo";
import Form from "components/Common/Form";
import Button from "components/Common/Button";

const titleMap: Record<number, string> = {
  0: "Item info",
  1: "Set prices",
  2: "Location and shipping",
};

const btnClassName = "py-2 px-8 uppercase";

export default function SellForm() {
  const { step, stepIndex, next, back } = useMultistepForm([
    <ItemInfo />,
    <Prices />,
    <ShippingInfo />,
  ]);
  return (
    <div>
      <Breadcrumb
        title="Seller"
        items={[{ title: "My accout", to: "/account" }, { title: "Sell item" }]}
      />
      <Form title={titleMap[stepIndex]} onSubmit={() => Promise.resolve()}>
        {step}
        <div className="flex justify-between">
          <Button
            type="secondary"
            className={
              btnClassName +
              " hover:bg-lightgrey-200 hover:bg-opacity-40 duration-300"
            }
          >
            cancel
          </Button>
          <div className="flex gap-2">
            <Button
              type="primary"
              className={btnClassName}
              onClick={() => back()}
              formButtonType="button"
            >
              back
            </Button>
            <Button
              type="primary-filled"
              className={btnClassName + " hover:bg-opacity-70 duration-300"}
              onClick={() => next()}
              formButtonType="button"
            >
              next
            </Button>
          </div>
        </div>
      </Form>
      <div>here</div>
    </div>
  );
}
