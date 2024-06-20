function Title({ children }) {
    return (
        <h1 className="text-5xl">{children}</h1>
    )
}

function SubTitle({ children, color }) {

    return (
        <h2 className={`text-3xl ${color ? "text-"+color : "text-text"} opacity-95`}>{children}</h2>
    )

}

function Heading({ children, color,className }) {
    return (
        <>
            <h3 className={`${className} text-xl ${color ? "text-"+color : "text-text"} opacity-90`}>{children}</h3>
        </>
    )
}

function Text({ children, color, className }) {
    return (
        <p className={`${className} text-md ${color ? "text-"+color : "text-text"} opacity-85`}>{children}</p>
    )
}

export { Title, SubTitle, Heading, Text }
