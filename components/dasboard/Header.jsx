import Link from "next/link"
import ProfilePic from "./Profile"

function Header() {
    return (
        <>
            <nav className="w-screen h-20 px-10 py-3 border-b-primary/30 border-transparent border flex items-center justify-between">
                <div className="flex gap-10">
                    <Tab link={'/dashboard/classes'}>Classes</Tab>
                    <Tab link={'/dashboard/classes'}>Files</Tab>
                    <Tab link={'/dashboard/classes'}>Students</Tab>
                </div>
                <ProfilePic />
            </nav>
        </>
    )
}

function Tab({ children, link }) {
    return (
        <Link href={link}>
            <div className="p-3 w-32 flex justify-center rounded-md bg-accent/10 hover:bg-accent/20 transition-colors">
                {children}
            </div>
        </Link>
    )
}

export default Header