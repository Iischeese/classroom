'use client'

import { useRouter } from "next/navigation"
import Button from "../Button"
import { SubTitle } from "../Typography"

function Navigation({ title, children, close }) {

    return (
        <>
            <div className="flex w-full justify-between items-center py-5 border-b border-text/40">
                <SubTitle>{title}</SubTitle>
                <div className="flex items-center gap-2">
                    {children}
                    {
                        close ?
                        <Button noForm={close}>Close</Button>
                        :
                        <BackButton />
                    }
                </div>
            </div>
            <div className="py-[.625rem]"></div>
        </>
    )
}

function BackButton({ className }) {

    const router = useRouter()

    const back = () => {
        router.back()
    }

    return (
        <Button style={`${className} w-min`} noForm={back}>Back</Button>
    )
}

export { BackButton }
export default Navigation