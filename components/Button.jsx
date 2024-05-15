import Link from "next/link"

function Button({ id, mono, children, primary, link, click, style, noForm,type }) {
    return link ?
        (
            <Link className="w-full" href={link}>
                <Template type={type} id={id} noForm={noForm} black={mono} css={style} action={click} color={primary} text={children} ></Template>
            </Link>
        )
        :
        (
            <Template id={id} noForm={noForm} black={mono} css={style} action={click} color={primary} text={children} />
        )
}

function Template({ id, color, text, action, css, black, noForm,type }) {
    return (
        <button id={id} onClick={noForm} formAction={action} className={`${css} ${black ? color ? "bg-text border-text/40 border text-background" : "bg-text/5 border-text/40 border" : color ? "bg-primary text-background" : "bg-secondary"} w-full py-3 px-5 rounded-md hover:opacity-70 transition-opacity`}>{text}</button>
    )
}

export default Button