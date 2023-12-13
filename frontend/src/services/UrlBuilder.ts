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
  public register(): UrlBuilder {
    this._url += "/register";
    return this;
  }
  public bids(): UrlBuilder {
    this._url += "/bids";
    return this;
  }
  public user(): UrlBuilder {
    this._url += "/user";
    return this;
  }
  public validate(): UrlBuilder {
    this._url += "/validate";
    return this;
  }
  public pay(): UrlBuilder {
    this._url += "/pay";
    return this;
  }
  public userInteraction(): UrlBuilder {
    this._url += "/user-interaction";
    return this;
  }
  public subcategory(): UrlBuilder {
    this._url += "/subcategory";
    return this;
  }
  public seller(): UrlBuilder {
    this._url += "/seller";
    return this;
  }
  public recommended(): UrlBuilder {
    this._url += "/recommended";
    return this;
  }
}
