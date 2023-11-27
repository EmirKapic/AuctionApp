import Container from "components/Common/Container";
import SocialMediaIcon from "components/Navbar/SocialMediaIcon";
import { UserContext } from "contexts/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

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
        {userContext ? (
          <div className="text-white">
            Hi, <span>{userContext?.firstName || "John"}</span>
          </div>
        ) : (
          <div className="text-white flex gap-3">
            <Link to={"/account/login"}>Login</Link>
            <span className="text-lightgrey-200">or</span>
            <Link to={"/account/register"}>Create an account</Link>
          </div>
        )}
      </Container>
    </section>
  );
}
