import Link from "next/link"

function Button(props) {
    return props.link ?
        (
            <Link href={props.link}>
                <Template data={props} ></Template>
            </Link>
        )
        :
        (
            <Template data={props} />
        )
}

function Template({ data }) {
    return (
        <button id={data.id} onClick={data.noForm} formAction={data.click} className={`${data.style} ${data.danger ? "bg-red-500 text-text" : data.primary ? "bg-primary border-text/40 border text-background" : "bg-secondary border-text/40 border" } flex justify-center items-center gap-2 backdrop-blur-sm backdrop-filter w-full py-3 px-5 rounded-md hover:opacity-70 transition-opacity`}>{data.children}</button>
    )
}

export default Button