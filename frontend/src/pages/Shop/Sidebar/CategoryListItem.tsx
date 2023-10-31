import CategoryWithSubs from "models/CategoryWithSubs";
import { useNavigate, useSearchParams } from "react-router-dom";
import buildQueryParams from "services/QueryParamsBuilder";
import Icon from "svgs/Icon";

export interface CategoryListItemProps {
  category: CategoryWithSubs;
  active: boolean;
}

export default function CategoryListItem(props: CategoryListItemProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function handleSelect(categoryId: string, subcategoryId?: string): void {
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
  const selectedSubcategoryId = parseInt(
    searchParams.get("subcategoryId") || "-1",
  );

  const subCategories = props.category.subCategories.map((subCategory) => (
    <li
      className={
        "text-lightgrey-200 list-none py-1 cursor-pointer" +
        (selectedSubcategoryId && selectedSubcategoryId === subCategory.id
          ? " text-purple"
          : "")
      }
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
        <button>
          <Icon name={props.active ? "minus" : "plus"} />
        </button>
      </div>
      {props.active && subCategories}
    </div>
  );
}
