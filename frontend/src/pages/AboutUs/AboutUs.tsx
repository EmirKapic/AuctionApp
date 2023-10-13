import SubHeader from "src/components/Common/Subheader";

export default function AboutUs(){
    return (
        <div>
            <SubHeader leftText="ABOUT US"
                        rightTextMain="SHOP"
                        rightTextSub="ABOUT US"/>
            <main className="max-w-[1280px] w-full mx-auto mb-10">
                <h1 className="text-4xl font-[400] py-10">About Us</h1>
                <section className="flex justify-stretch w-full flex-wrap">
                    <article className="w-1/2">
                        <p className="opacity-50 max-w-[60ch] pb-5 leading-7" style={{wordSpacing : "3px", fontSize : "18px"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu magna. In convallis diam volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget laoreet quam molestie. In id elementum turpis. Curabitur quis tincidunt mauris. Duis pharetra a odio vitae consectetur. Nullam vitae lacinia nisi, at porta sapien. Etiam vehicula augue at lacus tempus euismod. Nullam sit amet eros ut metus pulvinar volutpat et elementum lacus. Cras mauris mi, vulputate ac justo vitae, fringilla vestibulum sapien. Sed hendrerit nulla id luctus placerat. Sed venenatis ornare augue, et viverra dolor ullamcorper id. Duis id quam hendrerit, mollis ex ut, varius ipsum.
                        </p>
                        <p className="opacity-50 max-w-[60ch] pb-5 leading-7" style={{wordSpacing : "3px", fontSize : "18px"}}>
                            Etiam bibendum viverra nulla, at cursus leo fringilla eget. In pellentesque viverra elit id vestibulum. Sed eget leo suscipit, commodo urna vitae, efficitur ligula. Pellentesque non mauris blandit, ultrices nibh consectetur, auctor velit. Nunc ac justo lacus. Vivamus et gravida ante. Quisque cursus augue ligula, aliquam ullamcorper enim ultricies sit amet. In placerat sapien eu ligula commodo pharetra. Nunc et facilisis dolor, ut condimentum metus. Phasellus lacinia efficitur diam sed pharetra. Nullam euismod magna at mauris hendrerit scelerisque vitae vel leo. Cras interdum tellus in sapien fermentum consequat.
                        </p>
                    </article>
                    <aside className="w-1/2 grid grid-rows-2 grid-cols-2 gap-3">
                        <div className="row-span-1 col-span-full">
                            <img src='https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'></img>
                        </div>
                        <div className="col-span-1 row-span-1">
                            <img className="object-cover h-[200px]" src="https://parrotprint.com/wp/wp-content/uploads/2017/04/pexels-photo-27411.jpg"></img>
                        </div>
                        <div className="col-span-1 row-span-1 w-full">
                            <img className="object-cover h-[200px]" src="https://images.agoramedia.com/wte3.0/gcms/Ways-to-Encourage-Your-Baby-to-Play-Alone-alt-722x406.jpg"></img>
                        </div>
                    </aside>
                </section>
            </main>
        </div>
        

    )
}