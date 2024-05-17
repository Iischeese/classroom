function Title({ children }) {
    return (
        <h1 className="text-5xl">{children}</h1>
    )
}

function SubTitle({ children }) {

    return (
        <h2 className="text-3xl text-text/95">{children}</h2>
    )

}

function Heading({ children }) {
    return (
        <>
            <h3 className="text-xl text-text/90">{children}</h3>
        </>
    )
}

function Text({ children }) {
    return (
        <p className="text-sm text-text/85">{children}</p>
    )
}

export { Title, SubTitle, Heading, Text }
