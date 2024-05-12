import Link from "next/link"

function Button({ mono, children, primary, link, click, style }) {
    return link ?
        (
            <Link className="w-full" href={link}>
                <Template black={mono} css={style} action={click} color={primary} text={children} ></Template>
            </Link>
        )
        :
        (
            <Template black={mono} css={style} action={click} color={primary} text={children} />
        )
}

function Template({ color, text, action, css, black }) {
    return (
        <button formAction={action} className={`${css} ${black ? color ? "bg-text border-text/40 border text-background" : "bg-text/5 border-text/40 border" : color ? "bg-primary" : "bg-secondary"} w-full py-3 px-5 rounded-md hover:opacity-70 transition-opacity`}>{text}</button>
    )
}

export default Button