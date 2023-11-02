export type QueryParameter = {
  key?: string;
  value?: string;
};

export default function buildQueryParams(params: QueryParameter[]): string {
  const queryParams = params.reduce((searchParams, param) => {
    if (param.key && param.value) {
      searchParams.append(param.key, param.value);
    }
    return searchParams;
  }, new URLSearchParams());

  return queryParams.toString();
}
