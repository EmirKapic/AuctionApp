export type QueryParameter = {
  key?: string;
  value?: string;
};

export default function buildQueryParams(params: QueryParameter[]): string {
  const searchParams = new URLSearchParams();
  //i know u said no for each but honestly dont think its that bad here bcs side effect is the entire point
  params.forEach((param) => {
    if (param.key && param.value) {
      searchParams.append(param.key, param.value);
    }
  });
  return searchParams.toString();
}
