import Link from "next/link"
import ProfilePic from "./Profile"

function Header() {
    return (
        <>
            <nav className="sticky top-0 left-0 bg-background w-20 h-screen flex flex-col items-center justify-between border-r-text/20 border-transparent border px-3 py-10">
                <div className="flex flex-col gap-10">
                    <Tab href='/dashboard/classes'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg></Tab>
                </div>
                <Link href={'/dashboard/account'} className="w-full aspect-square">
                    <ProfilePic />
                </Link>
            </nav>
        </>
    )
}

function Tab({ children, href }) {
    return (
        <Link href={href}>
            <div className="bg-text/10 w-full p-3 aspect-square rounded-md hover:bg-text/30 transition-colors flex justify-center items-center">{children}</div>
        </Link>
    )
}

export default Header