import Link from "next/link"
import ProfilePic from "./Profile"
import { BookIcon, HardDriveIcon } from "lucide-react"

function Header() {
    return (
        <>
            <nav className="sticky top-0 left-0 bg-background w-20 h-screen flex flex-col items-center justify-between border-r-text/20 border-transparent border px-3 py-10">
                <div className="flex flex-col gap-10">
                    <Tab href='/dashboard/classes'><BookIcon/></Tab>
                    <Tab href='/dashboard/drive'><HardDriveIcon /></Tab>
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