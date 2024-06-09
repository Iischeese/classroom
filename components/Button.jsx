import Link from "next/link"

function Button({link,id,noForm,click,style,danger,primary,children}) {
    return link ?
        (
            <Link href={link}>
                <Template data={{id, noForm, click, style, danger, primary, children}} ></Template>
            </Link>
        )
        :
        (
            <Template data={{id, noForm, click, style, danger, primary, children}} />
        )
}

function Template({ data }) {
    return (
        <button id={data.id} onClick={data.noForm} formAction={data.click} className={`${data.style} ${data.danger ? "bg-red-500 text-text" : data.primary ? "bg-primary border-text/40 border text-background" : "bg-secondary border-text/40 border" } flex justify-center items-center gap-2 backdrop-blur-sm backdrop-filter w-full py-3 px-5 rounded-md hover:opacity-70 transition-opacity`}>{data.children}</button>
    )
}

export default Button