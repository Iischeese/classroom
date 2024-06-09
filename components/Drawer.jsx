'use client'

import { useEffect } from "react"
import Navigation from "./dashboard/Navigation"

function Drawer({ size, title, children, open, setOpen }) {

    const close = () => {
        setOpen(false)
    }

    useEffect(() => {
        window.addEventListener("keypress", (e) => {
            if (e.code == "Escape") {
                close()
            }
        })
    }, [])

    let percent;

    switch (size) {
        case "sm":
            percent = "w-[30%]"
            break;
        case "md":
            percent = "w-[45%]"
            break;
        case "lg":
            percent = "w-[50%]"
            break;
        default:
            percent = "w-[30%]"
            break;
    }

    return (
        <div className={`top-0 ${open ? "right-0" : "-right-[100%]"} p-5 transition-all duration-250 ease-in-out ${percent} min-w-52 h-screen fixed bg-background border-l border-text/40 rounded-l-md`}>
            <Navigation title={title} close={close} />
            {children}
        </div>
    )
}

export default Drawer