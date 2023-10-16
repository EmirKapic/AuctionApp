import CategoriesList from "./CategoriesList";



export default function Hero(){
    return (
        <section className="bg-lightgrey-100 w-full">
            <div className="max-w-[1280px] w-full mx-auto flex">
                <CategoriesList />
                <main className="flex-grow">
                    hi
                </main>
            </div>
            here
        </section>
    )
}