'use client'

import { useEffect } from "react"
import Navigation from "./dashboard/Navigation"

function Drawer({ title, children, open, setOpen }) {

    const close = () => {
        setOpen(false)
    }

    useEffect(() => {
        window.addEventListener("keypress", (e) => {
            if(e.code == "Escape"){
                close()
            }
        })
    }, [])

    return (
        <div className={`top-0 ${open ? "right-0" : "-right-[100%]"} p-5 transition-all duration-250 ease-in-out w-[30%] min-w-52 h-screen fixed bg-background border-l border-text/40 rounded-l-md`}>
            <Navigation title={title} close={close} />
            {children}
        </div>
    )
}

export default Drawer