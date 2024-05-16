function Title({ children }) {
    return (
        <h1 className="text-5xl">{children}</h1>
    )
}

function SubTitle({ children }) {

    return (
        <h2 className="text-3xl">{children}</h2>
    )

}

function Heading({ children }) {
    return (
        <>
            <h3 className="text-xl">{children}</h3>
        </>
    )
}

function Text({ children }) {
    return (
        <p className="text-sm">{children}</p>
    )
}

export { Title, SubTitle, Heading, Text }
