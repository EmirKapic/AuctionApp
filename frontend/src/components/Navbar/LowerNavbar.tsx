import Container from "components/Common/Container";
import { Link, useLocation } from "react-router-dom";
import Icon from "svgs/Icon";

export default function LowerNavbar() {
  const { pathname } = useLocation();

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
          <section className="max-w-[60%] flex-grow relative invisible">
            <input
              type="text"
              role="search"
              placeholder="Try enter: Shoes"
              className="outline outline-gray-200 w-full py-4 indent-4 shadow-lightgrey"
            />
            <div className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer">
              <Icon name="magnify" />
            </div>
          </section>

          <nav>
            <ul className="flex gap-5 uppercase">
              <li className="cursor-pointer">
                <Link
                  className={pathname === "/" ? "text-purple font-bold" : ""}
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <li className="cursor-pointer">
                <a className={"invisible "}>Shop</a>
              </li>
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
