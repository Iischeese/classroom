import Link from "next/link"

function Button({ children, primary, link, click, style}) {
    return link ?
        (
            <Link className="w-full" href={link}>
                <Template css={style} action={click} color={primary} text={children} ></Template>
            </Link>
        )
        :
        (
            <Template css={style} action={click} color={primary} text={children}/>
        )
}

function Template({color, text, action, css}) {
    return (
        <button formAction={action} className={`${css} ${color ? "bg-primary" : "bg-secondary"} w-full py-3 px-5 rounded-md hover:opacity-70 transition-opacity`}>{text}</button>
    )
}

export default Button