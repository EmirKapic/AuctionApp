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
  const baseHeaders = new Headers(options?.headers);
  baseHeaders.append("Content-Type", "application/json");
  const res = await fetch(url, {
    method: options?.method,
    headers: baseHeaders,
    body: JSON.stringify(options?.body),
  });
  const resJson = await res.json();
  return { data: resJson, success: res.ok };
}
