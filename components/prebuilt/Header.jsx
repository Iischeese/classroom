import Button from "../Button"

function Header() {
    return (
        <>
            <header className="bg-background/50 backdrop-blur-[100rem] fixed w-screen border border-transparent border-b-text flex items-center justify-between p-3">
                <h1 className="text-xl">Noall</h1>
                <div>
                    <Button link='/login'>Log In</Button>
                </div>
            </header>
        </>
    )
}

export default Header