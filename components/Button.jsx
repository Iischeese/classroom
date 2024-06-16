import Link from "next/link"

function Button({disabled,link,id,noForm,click,style,danger,primary,children, ...props}) {
    return link ?
        (
            <Link href={link}>
                <Template {...props} data={{disabled, id, noForm, click, style, danger, primary, children}} ></Template>
            </Link>
        )
        :
        (
            <Template {...props} data={{disabled, id, noForm, click, style, danger, primary, children}} />
        )
}

function Template({ data, ...props }) {
    return (
        <button disabled={data.disabled} {...props} id={data.id} onClick={data.noForm} formAction={data.click} className={`${data.style} ${data.danger ? "bg-red-500 text-text" : data.primary ? "bg-primary border-text/40 border text-background" : "bg-secondary border-text/40 border" } flex justify-center items-center gap-2 backdrop-blur-sm backdrop-filter w-full py-3 px-5 rounded-md hover:opacity-70 transition-opacity disabled:opacity-30`}>{data.children}</button>
    )
}

export default Button