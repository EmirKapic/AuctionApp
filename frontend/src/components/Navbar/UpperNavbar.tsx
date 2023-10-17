import SocialMediaIcon from "components/Navbar/SocialMediaIcon";

export default function UpperNavbar() {
  return (
    <section className="w-full py-2 bg-grey_">
      <div className="flex justify-between max-w-container-lg w-full mx-auto items-center">
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
        <p className="text-white">Hi, John Doe</p>
      </div>
    </section>
  );
}
