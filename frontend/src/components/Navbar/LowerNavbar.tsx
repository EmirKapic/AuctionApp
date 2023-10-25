import Container from "components/Common/Container";
import { LegacyRef, ReactNode, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "svgs/Icon";

export default function LowerNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (e.key !== "enter") return;
      handleSearch();
    });
  }, []);

  function handleSearch(): void {
    const inputValue = inputRef!.current?.value;
    if (!inputValue) return;
    navigate(`/shop?name=${inputValue}`, { state: { pageReset: 1 } });
  }

  function renderNavLink(title: string, to: string, path: string): ReactNode {
    return (
      <li className="cursor-pointer">
        <Link
          className={pathname === path ? "text-purple font-bold" : ""}
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
          <section className="max-w-[60%] flex-grow relative">
            <input
              ref={inputRef}
              type="text"
              role="search"
              placeholder="Try enter: Shoes"
              className="outline outline-gray-200 w-full py-4 indent-4 shadow-lightgrey"
            />
            <div
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
              onClick={handleSearch}
            >
              <Icon name="magnify" />
            </div>
          </section>

          <nav>
            <ul className="flex gap-5 uppercase">
              {renderNavLink("Home", "/", "/")}
              {renderNavLink("Shop", "/shop", "/shop")}
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
