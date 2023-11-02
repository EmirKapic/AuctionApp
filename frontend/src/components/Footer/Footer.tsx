import { Link } from "react-router-dom";
import SocialMediaIcon from "components/Navbar/SocialMediaIcon";

export default function Footer() {
  return (
    <footer className="flex gap-24 justify-evenly bg-grey_ pt-1 px-1 pb-32 text-white flex-shrink-0 h-72">
      <section>
        <h3 className="py-4 opacity-50">AUCTION</h3>
        <nav>
          <ul className="flex flex-col gap-3 opacity-80">
            <li>
              <Link to="/shop/about">About us</Link>
            </li>
            <li>
              <Link to="/shop/terms">Terms and conditions</Link>
            </li>
            <li>
              <Link to="/shop/privacy">Privacy policy</Link>
            </li>
          </ul>
        </nav>
      </section>
      <section>
        <h3 className="py-4 opacity-50">GET IN TOUCH</h3>
        <nav>
          <ul className="flex flex-col gap-3 opacity-80">
            <li>
              <a href="tel:123 797 567 2535">Call us at +123 797-567-2535</a>
            </li>
            <li>
              <a href="mailto:emirkapic0@gmail.com">support@auction.com</a>
            </li>
            <ul className="flex items-center gap-4">
              <a href="https://bs-ba.facebook.com/Emir.Kapic02">
                <SocialMediaIcon name="facebook" />
              </a>
              <a href="https://www.instagram.com/kapic.e/">
                <SocialMediaIcon name="insta" />
              </a>

              <a href="https://twitter.com/elonmusk">
                <SocialMediaIcon name="twitter" />
              </a>
            </ul>
          </ul>
        </nav>
      </section>
    </footer>
  );
}
