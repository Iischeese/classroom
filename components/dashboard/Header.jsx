import Link from "next/link"

function Header() {
    return (
        <>
            <nav className="w-screen h-20 flex gap-10 items-center border-b-text/20 border-transparent border px-10">
                <Tab href='/dashboard/classes'>Classes</Tab>
                <Tab href='/dashboard/account'>Account</Tab>
            </nav>
        </>
    )
}

function Tab({ children, href }) {
    return (
        <Link href={href}>
            <div className="bg-text/10 w-32 rounded-md px-5 py-3 hover:bg-text/30 transition-colors flex justify-center">{children}</div>
        </Link>
    )
}

export default Header