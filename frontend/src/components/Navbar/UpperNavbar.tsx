import SocialMediaIcon from "./SocialMediaIcon";

export default function UpperNavbar(){
    return (
        <section className="w-full py-[8px]"
            style={{
                background:" #252525"
            }}>
            <div className="flex justify-between max-w-[1280px] w-full mx-auto items-center"
                >
                <nav>
                    <ul className="flex items-center gap-4">
                        <SocialMediaIcon name="facebook"/>
                        <SocialMediaIcon name="insta" />
                        <SocialMediaIcon name="twitter"/>
                    </ul>
                </nav>
                <p className="text-white">
                    Hi, John Doe
                </p>
            </div>
        </section>
    )
}