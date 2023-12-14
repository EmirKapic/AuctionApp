import { getAuthorizationHeaders } from "services/UserAuth";
import HttpMethod from "../HttpMethods";
export interface FetchOptions<T> {
  method?: HttpMethod;
  body?: T;
  headers?: Headers;
}

export type FetchReturnType<T> = { data: T; success: boolean };

export async function fetchData<R, B = any>(
  url: string,
  options?: FetchOptions<B>,
): Promise<FetchReturnType<R>> {
  const completeHeaders = new Headers(getAuthorizationHeaders());
  completeHeaders.append("Content-Type", "application/json");
  options?.headers?.forEach((val, key) => completeHeaders.append(key, val));
  const res = await fetch(url, {
    method: options?.method,
    headers: completeHeaders,
    body: JSON.stringify(options?.body),
  });
  const resJson = await res.json();
  return { data: resJson, success: res.ok };
}
