import { FetchReturnType, fetchData } from "./FetchData";
import { HttpOptions } from "./Options";

export default function put<R, B = any>(
  url: string,
  requestBody: B,
  options?: HttpOptions,
): Promise<FetchReturnType<R>> {
  return fetchData<R, B>(url, {
    method: "PUT",
    headers: options?.headers,
    body: requestBody,
  });
}
