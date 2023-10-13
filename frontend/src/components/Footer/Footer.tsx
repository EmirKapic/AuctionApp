import SocialMediaIcon from "src/components/Navbar/SocialMediaIcon";




export default function Footer(){
    return (
        <footer className="flex gap-24 justify-evenly bg-grey_ pt-1 px-1 pb-32 text-white flex-shrink-0">
            <section>
                <h3 className="py-4 opacity-50">AUCTION</h3>
                <nav>
                    <ul className="flex flex-col gap-3 opacity-80">
                        <li>
                            <a>About us</a>
                        </li>
                        <li>
                            <a>Terms and conditions</a>
                        </li>
                        <li>
                            <a>Privacy policy</a>
                        </li>
                    </ul>
                </nav>
            </section>
            <section>
                <h3 className="py-4 opacity-50">GET IN TOUCH</h3>
                <nav>
                    <ul className="flex flex-col gap-3 opacity-80">
                        <li>
                            <a>Call us at +123 797-567-2535</a>
                        </li>
                        <li>
                            <a>support@auction.com</a>
                        </li>
                        <ul className="flex items-center gap-4">
                            <SocialMediaIcon name="facebook"/>
                            <SocialMediaIcon name="insta" />
                            <SocialMediaIcon name="twitter"/>
                        </ul>
                    </ul>
                </nav>
            </section>
        </footer>
    )
}