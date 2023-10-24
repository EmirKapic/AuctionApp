import CategoryWithSubs from "models/CategoryWithSubs";
import { useState } from "react";
import Icon from "svgs/Icon";

export interface CategoryListItemProps {
  category: CategoryWithSubs;
  active: boolean;
}

export default function CategoryListItem(props: CategoryListItemProps) {
  const [isActive, setIsActive] = useState(props.active);

  const subCategories = props.category.subCategories.map((subCategory) => (
    <li className="text-lightgrey-200 list-none py-1" key={subCategory.id}>
      {subCategory.name}
    </li>
  ));
  return (
    <div>
      <div
        className="flex justify-between py-2 cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <h1 className="text-sm">{props.category.name}</h1>
        {isActive ? (
          <button>
            <Icon name="minus" />
          </button>
        ) : (
          <button>
            <Icon name="plus" />
          </button>
        )}
      </div>
      {isActive && subCategories}
    </div>
  );
}
