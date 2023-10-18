export default class UrlBuilder {
  constructor(private _url: string = "http://localhost:8080/api") {}

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
  public recent(): UrlBuilder {
    this._url += "/recent";
    return this;
  }

  public lastchance(): UrlBuilder {
    this._url += "/lastchance";
    return this;
  }
}
