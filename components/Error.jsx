function Error({ title, desc, error }) {

    let details = {}

    if (error) {
        details = {
            code: error.code,
            message: error.details,
            description: error.message
        }
    }
    else {
        details = {
            code: null,
            message: title,
            description: desc
        }
    }

    return (
        <>
            <section className="w-screen h-full my-20 flex flex-col items-center justify-center">
                <h1 className="text-3xl text-red-500">{details.message ? details.message : "An Error Occurred"}</h1>
                <h2 className="text-xl text-red-500/70">{details.description ? details.description : "We have no further details."}</h2>
            </section>
        </>
    )
}

export default Error