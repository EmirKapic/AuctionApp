import { FetchReturnType, fetchData } from "./FetchData";
import { HttpOptions } from "./Options";
import { getAuthorizationHeaders } from "services/UserAuth";

export default function post<R, B = any>(
  url: string,
  requestBody: B,
  options?: HttpOptions,
): Promise<FetchReturnType<R>> {
  const completeHeaders = new Headers(getAuthorizationHeaders());
  options?.headers.forEach((val, key) => completeHeaders.append(key, val));

  return fetchData<R, B>(url, {
    method: "POST",
    headers: completeHeaders,
    body: requestBody,
  });
}
