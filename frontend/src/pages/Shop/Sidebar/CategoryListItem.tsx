import Checkbox from "components/Common/Checkbox";
import CategoryDto from "models/CategoryDto";
import { useSearchParams } from "react-router-dom";
import { className } from "services/ClassName";
import Icon from "svgs/Icon";

export interface CategoryListItemProps {
  category: CategoryDto;
  active: boolean;
}

export default function CategoryListItem(props: CategoryListItemProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSelectCategory(categoryId: string): void {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set("categoryId", categoryId);
    queryParams.delete("subcategoryId");
    setSearchParams(queryParams);
  }

  function handleSubcategorySelect(
    subcategoryId: number,
    active: boolean,
  ): void {
    const newSearchParams = new URLSearchParams(searchParams);
    if (active) {
      newSearchParams.append("subcategoryId", subcategoryId.toString());
    } else {
      const allSubcategoryParams = newSearchParams.getAll("subcategoryId");
      newSearchParams.delete("subcategoryId");
      allSubcategoryParams
        .filter((param) => param !== subcategoryId.toString())
        .forEach((param) => newSearchParams.append("subcategoryId", param));
    }

    setSearchParams(newSearchParams);
  }

  const selectedSubcategoryIds = searchParams
    .getAll("subcategoryId")
    .map((idString) => parseInt(idString));

  const subCategories = props.category.subCategories.map((subCategory) => (
    <li
      className={className(
        "text-lightgrey-200 list-none py-1 cursor-pointer flex",
        selectedSubcategoryIds.includes(subCategory.id) ? " text-purple" : "",
      )}
      key={subCategory.id}
    >
      <Checkbox
        id={subCategory.name}
        checked={selectedSubcategoryIds.includes(subCategory.id)}
        onChange={(active) => handleSubcategorySelect(subCategory.id, active)}
      />
      {`${subCategory.name}`}
    </li>
  ));
  return (
    <div>
      <div
        className="flex justify-between py-2 cursor-pointer"
        onClick={() => handleSelectCategory(props.category.id.toString())}
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
