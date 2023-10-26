import CategoryWithSubs from "models/CategoryWithSubs";
import { useNavigate } from "react-router-dom";
import buildQueryParams, { QueryParameter } from "services/QueryParamsBuilder";
import Icon from "svgs/Icon";

export interface CategoryListItemProps {
  category: CategoryWithSubs;
  active: boolean;
}

export default function CategoryListItem(props: CategoryListItemProps) {
  const navigate = useNavigate();

  const subCategories = props.category.subCategories.map((subCategory) => (
    <li
      className="text-lightgrey-200 list-none py-1 cursor-pointer"
      key={subCategory.id}
      onClick={() => {
        navigate(
          `/shop?${buildQueryParams([
            { key: "categoryId", value: props.category.id.toString() },
            { key: "subcategoryId", value: subCategory.id.toString() },
          ])}`,
          {
            state: {
              pageReset: 1,
            },
          },
        );
      }}
    >
      {subCategory.name}
    </li>
  ));
  return (
    <div>
      <div
        className="flex justify-between py-2 cursor-pointer"
        onClick={() => {
          navigate(
            `/shop?${buildQueryParams([
              { key: "categoryId", value: props.category.id.toString() },
            ])}`,
            {
              state: {
                pageReset: 1,
              },
            },
          );
        }}
      >
        <h1 className="text-sm">{props.category.name}</h1>
        {props.active ? (
          <button>
            <Icon name="minus" />
          </button>
        ) : (
          <button>
            <Icon name="plus" />
          </button>
        )}
      </div>
      {props.active && subCategories}
    </div>
  );
}
