import CategoryWithSubs from "models/CategoryWithSubs";
import { useNavigate } from "react-router-dom";
import buildQueryParams from "services/QueryParamsBuilder";
import Icon from "svgs/Icon";

export interface CategoryListItemProps {
  category: CategoryWithSubs;
  active: boolean;
}

export default function CategoryListItem(props: CategoryListItemProps) {
  const navigate = useNavigate();

  function handleSelect(categoryId: string, subcategoryId?: string) {
    const queryParams = buildQueryParams([
      { key: "categoryId", value: categoryId },
      { key: "subcategoryId", value: subcategoryId },
    ]);
    navigate(`/shop?${queryParams}`, {
      state: {
        pageReset: true,
      },
    });
  }

  const subCategories = props.category.subCategories
    .sort((subCatA, subCatB) => subCatB.productCount - subCatA.productCount)
    .map((subCategory) => (
      <li
        className="text-lightgrey-200 list-none py-1 cursor-pointer"
        key={subCategory.id}
        onClick={() =>
          handleSelect(props.category.id.toString(), subCategory.id.toString())
        }
      >
        {`${subCategory.name} (${subCategory.productCount})`}
      </li>
    ));
  return (
    <div>
      <div
        className="flex justify-between py-2 cursor-pointer"
        onClick={() => handleSelect(props.category.id.toString())}
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
