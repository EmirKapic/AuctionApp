import Product from "models/Product";
import post from "./fetching/Post";
import UrlBuilder from "./UrlBuilder";

type UserSubcategoryInteractionBody = {
  id?: number;
};

type UserSellerInteractionBody = {
  email?: string;
};

const UserInteractionService = {
  updateInteractions: function (product?: Product) {
    post<any, UserSubcategoryInteractionBody>(
      new UrlBuilder().userInteraction().subcategory().url,
      { id: product?.subCategory.id },
    );
    post<any, UserSellerInteractionBody>(
      new UrlBuilder().userInteraction().seller().url,
      { email: product?.user.email },
    );
  },

  updateSubcategoryInteraction: function (subcategoryId?: number) {
    post<any, UserSubcategoryInteractionBody>(
      new UrlBuilder().userInteraction().subcategory().url,
      { id: subcategoryId },
    );
  },
};

export default UserInteractionService;
