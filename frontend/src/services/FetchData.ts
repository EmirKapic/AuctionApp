import HttpMethod from "./HttpMethods";
export type HttpHeader = {
  headerName: string;
};
export interface FetchOptions<T> {
  method?: HttpMethod;
  body?: T;
  headers?: Headers;
  contentType?: string;
}

export type FetchReturnType<T> = { data: T; success: boolean };

export async function fetchData<R, B = any>(
  url: string,
  options?: FetchOptions<B>,
): Promise<FetchReturnType<R>> {
  const res = await fetch(url, {
    method: options?.method,
    headers: options?.headers,
    body: JSON.stringify(options?.body),
  });
  const resJson = await res.json();
  return { data: resJson, success: res.ok };
}
