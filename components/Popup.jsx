import { Heading, SubTitle } from "./Typography"

function Popup({children, open}){
    return(
        <div className={`${open ? "" : "hidden"} w-screen h-screen flex items-center justify-center bg-background/50 absolute z-[10000]`}>
            <div className="w-96 aspect-video flex flex-col justify-between bg-background border border-text/40 rounded-md">
                {children}
            </div>
        </div>
    )
}

function PopupContent({children}){
    return(
        <div className="flex flex-col gap-3 p-3">
            {children}
        </div>
    )
}

function PopupHeader({children}){
    return(
        <div className="w-full border-b-text/40 border-b p-3">
            <SubTitle>{children}</SubTitle>
        </div>
    )
}

function PopupFooter({children}){
    return(
        <div className="flex justify-between w-full border-t-text/40 border-t p-3">
            {children}
        </div>
    )
}

export {Popup, PopupHeader, PopupFooter, PopupContent}