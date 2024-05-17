function Error({ title, desc }) {
    return (
        <>
            <section className="w-screen h-full my-20 flex flex-col items-center justify-center">
                <h1 className="text-3xl text-red-500">{title ? title : "An Error Occurred"}</h1>
                <h2 className="text-xl text-red-500/70">{desc ? desc : "We don't know much more."}</h2>
            </section>
        </>
    )
}

export default Error