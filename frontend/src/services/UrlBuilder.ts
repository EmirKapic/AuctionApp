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
  public search(): UrlBuilder {
    this._url += "/search";
    return this;
  }
  public auth(): UrlBuilder {
    this._url += "/auth";
    return this;
  }
  public login(): UrlBuilder {
    this._url += "/login";
    return this;
  }
}
