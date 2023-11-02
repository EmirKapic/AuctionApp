import Container from "components/Common/Container";
import { FormEvent, ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "svgs/Icon";

export default function LowerNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const pathPrefix = pathname === "/" ? "/" : pathname.split("/")[1];

  function handleSearch(e: FormEvent): void {
    e.preventDefault();
    if (!searchText) return;
    navigate(`/shop?name=${searchText}`, { state: { pageReset: true } });
  }

  function renderNavLink(title: string, to: string, path: string): ReactNode {
    return (
      <li className="cursor-pointer" key={to}>
        <Link
          className={path === pathPrefix ? "text-purple font-bold" : ""}
          to={to}
        >
          {title}
        </Link>
      </li>
    );
  }

  return (
    <section>
      <Container
        type="large"
        className="flex items-center py-4 justify-between font-light"
      >
        <section className="flex items-center">
          <Link to={"/"} className="flex">
            <Icon name="hammer" />
            <h5 className="text-2xl tracking-wider text-purple uppercase">
              Auction
            </h5>
          </Link>
        </section>

        <section className="flex w-full justify-end items-center gap-10">
          <form
            className="max-w-[60%] flex-grow relative"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              role="search"
              placeholder="Try enter: Shoes"
              className="outline outline-gray-200 w-full py-4 indent-4 shadow-lightgrey"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="absolute top-1/2 right-4 -translate-y-1/2"
              type="submit"
            >
              <Icon name="magnify" />
            </button>
          </form>

          <nav>
            <ul className="flex gap-5 uppercase">
              {renderNavLink("Home", "/", "/")}
              {renderNavLink("Shop", "/shop", "shop")}
              <li className="cursor-pointer">
                <a className={"invisible "}>My account</a>
              </li>
            </ul>
          </nav>
        </section>
      </Container>
    </section>
  );
}
