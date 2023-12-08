import CategoryDto from "models/CategoryDto";
import { useSearchParams } from "react-router-dom";
import Icon from "svgs/Icon";

export interface CategoryListItemProps {
  category: CategoryDto;
  active: boolean;
}

export default function CategoryListItem(props: CategoryListItemProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSelect(categoryId: string, subcategoryId?: string): void {
    const queryParams = new URLSearchParams();
    queryParams.append("categoryId", categoryId);
    if (subcategoryId) {
      queryParams.append("subcategoryId", subcategoryId);
    }
    setSearchParams(queryParams);
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
