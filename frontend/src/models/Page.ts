type Page<T> = {
  content: Array<T>;
  last: boolean;
  totalPages: number;
};

export default Page;
