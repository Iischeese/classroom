function SettingsContainer({ children }) {
    return (
        <main className="w-full flex justify-center gap-20">
            {children}
        </main>
    )
}

function Content({noSpread, children}) {
    return (
        <div className={`lg:w-[60%] w-[90%] py-5 flex flex-col ${noSpread? "" : "gap-10"}`}>
            {children}
        </div>
    )
}

function SideBar({ children }) {
    return (
        <div className="w-1/6 h-screen flex flex-col gap-4 items-center justify-center py-10 sticky left-0 top-0">
            {children}
        </div>
    )
}

export {Content, SideBar}

export default SettingsContainer