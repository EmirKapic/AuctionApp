import Button from "components/Common/Button";
import { useNavigate } from "react-router-dom";
import Icon from "svgs/Icon";

export default function NotBidding() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col gap-3 my-8">
      <Icon name="largeHammer" />
      <p>
        You dont have any bids and there are so many cool products available for
        sale.
      </p>
      <Button
        type="primary"
        className="py-3 uppercase px-20"
        onClick={() => navigate("/")}
      >
        Start bidding
      </Button>
    </div>
  );
}
