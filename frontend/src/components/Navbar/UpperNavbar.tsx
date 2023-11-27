import Container from "components/Common/Container";
import SocialMediaIcon from "components/Navbar/SocialMediaIcon";
import { UserContext } from "contexts/UserContext";
import { useContext } from "react";

export default function UpperNavbar() {
  const userContext = useContext(UserContext);
  return (
    <section className="w-full py-2 bg-grey_">
      <Container className="flex justify-between items-center" type="large">
        <nav>
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
        </nav>
        <div className="text-white">
          Hi, <span>{userContext?.firstName || "John"}</span>
        </div>
      </Container>
    </section>
  );
}
