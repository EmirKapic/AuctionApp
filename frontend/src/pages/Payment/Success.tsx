import Button from "components/Common/Button";
import { useNavigate } from "react-router-dom";
import Icon from "svgs/Icon";

export default function Success() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center mt-10">
      <div className="flex items-center">
        <Icon name="largeHammer" />
        <h1 className="text-5xl text-purple font-bold">Success</h1>
      </div>

      <p className="text-xl">
        Your payment was successful. Thank you for participating in our
        auctions.
      </p>
      <div className="flex gap-20">
        <Button
          type="primary"
          className="py-3 px-5 w-56"
          onClick={() => navigate("/shop")}
        >
          Continue shopping
        </Button>
        <Button
          type="primary-filled"
          className="py-3 px-5 shadow-lightgrey w-56 hover:bg-opacity-80 duratipn-300"
          onClick={() => navigate("/")}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
}
