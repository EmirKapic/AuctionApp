

interface SubheaderProps{
    leftText : string,
    rightTextMain : string,
    rightTextSub : string
}


export default function SubHeader(props : SubheaderProps){
    return (
        <aside className="w-full bg-lightgrey-100">
            <div className="w-full max-w-[1280px] mx-auto flex justify-between py-5">
            <h3 className="tracking-wider text-lg">
                {props.leftText}
            </h3>
            <div className="flex text-base">
                <h3 className="pr-3 text-grey_ opacity-60 font-light">
                    {props.rightTextMain + " /"}
                </h3>
                <h3 className="tracking-wider">
                    {props.rightTextSub}
                </h3>
                </div>
            </div>
        </aside>
    )
}