import HttpMethod from "./HttpMethods";
export type HttpHeader = {
  headerName: string;
};
export interface FetchOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Headers;
  contentType?: string;
}

export type FetchReturnType<T> = { data: T; success: boolean };

export async function fetchData<T>(
  url: string,
  options?: FetchOptions,
): Promise<FetchReturnType<T>> {
  const res = await fetch(url, {
    method: options?.method,
    headers: options?.headers,
    body: JSON.stringify(options?.body),
  });
  const resJson = await res.json();
  return { data: resJson, success: res.ok };
}
