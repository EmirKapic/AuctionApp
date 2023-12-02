import { FetchReturnType, fetchData } from "./FetchData";
import { HttpOptions } from "./Options";

export default function get<R>(
  url: string,
  options?: HttpOptions,
): Promise<FetchReturnType<R>> {
  return fetchData(url, { method: "GET", headers: options?.headers });
}
