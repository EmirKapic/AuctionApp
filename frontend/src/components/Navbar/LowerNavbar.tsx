import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "src/svgs/Icon";



export default function LowerNavbar(){
    //1 selected Home, 2 selected Shop, 3 selected My profile, this is to know which one to color purple in the nav links
    const [selectedTab, setSelectedTab] = useState(1);
    const {pathname} = useLocation();

    useEffect(() => {
        if (pathname === "/about" || pathname === "/privacy" || pathname === "/terms"){
            setSelectedTab(2);
        }
        else{
            setSelectedTab(1);
        }
    }, [pathname]);
    
    return (
        <section>
            <div className="flex max-w-[1280px] w-full mx-auto items-center py-4 justify-between font-[300]">

                
                <section className="flex items-center">
                    <Link to={"/"} className="flex">
                        <Icon name="hammer"/> 
                        <h5 className="text-2xl tracking-wider text-purple">
                            AUCTION
                        </h5>
                    </Link>
                    
                </section>

                <section className="flex w-[100%] justify-end items-center gap-10">
                    <section className="max-w-[60%] flex-grow relative invisible">
                        <input type="text" role="search" placeholder="Try enter: Shoes" 
                                className="outline outline-gray-200 w-full py-4 indent-4"
                                style={{
                                    boxShadow : "3px 3px 0 0 rgba(0,0,0,0.11)"
                                }}
                                />
                        <div className="absolute top-[50%] right-4 translate-y-[-50%] cursor-pointer">
                            <Icon name="magnify"/>
                        </div>
                    </section>


                    <nav>
                        <ul className="flex gap-5"
                            style={{
                                textTransform : "uppercase"
                            }}>
                            <li className="cursor-pointer">
                                <Link className={selectedTab === 1 ? "text-purple font-[700]" : ""} to={"/"}>Home</Link>
                            </li>
                            <li className="cursor-pointer">
                                <a className={"invisible " + (selectedTab === 2 ? "text-purple font-[700]" : "")}>Shop</a>
                            </li>
                            <li className="cursor-pointer">
                                <a className={"invisible " + (selectedTab === 2 ? "text-purple font-[700]" : "")}>My account</a>
                            </li>
                        </ul>
                    </nav>
                </section>
            </div>
        </section>
    )
}