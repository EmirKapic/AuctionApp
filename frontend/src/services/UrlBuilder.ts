export default class UrlBuilder {
  constructor(private _url: string = import.meta.env.VITE_BACKEND_URL) {}

  public get url(): string {
    return this._url;
  }

  public products(): UrlBuilder {
    this._url += "/products";
    return this;
  }

  public random(): UrlBuilder {
    this._url += "/random";
    return this;
  }
  public categories(): UrlBuilder {
    this._url += "/categories";
    return this;
  }
  public id(id: number): UrlBuilder {
    this._url += `/${id.toFixed(0)}`;
    return this;
  }
}
