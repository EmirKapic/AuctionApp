import { FetchReturnType, fetchData } from "./FetchData";
import { HttpOptions } from "./Options";

//delete is keyword...
export default function deleteRequest<R>(
  url: string,
  options?: HttpOptions,
): Promise<FetchReturnType<R>> {
  return fetchData<R>(url, {
    method: "DELETE",
    headers: options?.headers,
  });
}
