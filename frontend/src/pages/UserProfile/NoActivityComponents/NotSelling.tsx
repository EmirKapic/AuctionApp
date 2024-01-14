import Button from "components/Common/Button";
import { useNavigate } from "react-router-dom";
import Icon from "svgs/Icon";

export default function NotSelling() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col gap-3 my-8">
      <div>
        <Icon name="largeCart"></Icon>
      </div>
      <p>You dont have any scheduled items for sale.</p>
      <Button
        type="primary"
        className="py-3 uppercase px-20"
        onClick={() => navigate(`/account/sell`)}
      >
        Start selling
      </Button>
    </div>
  );
}
