import Icon from "src/svgs/Icon";
import { IconType } from "src/svgs/Icon";

interface SocialMediaIconProps {
  name: IconType;
}

export default function SocialMediaIcon(props: SocialMediaIconProps) {
  return (
    <li className="w-7 rounded-full p-1 cursor-pointer bg-gray-400">
      <Icon name={props.name} />
    </li>
  );
}
