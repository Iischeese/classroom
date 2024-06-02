'use client'

import { useRouter } from "next/navigation"
import Button from "../Button"
import { SubTitle } from "../Typography"

function Navigation({ title, children }) {

    return (
        <div className="flex w-full justify-between items-center gap-32 py-5 border-b border-text/40">
            <SubTitle>{title}</SubTitle>
            <div className="flex items-center gap-2">
                {children}
                <BackButton />
            </div>
        </div>
    )
}

function BackButton() {

    const router = useRouter()

    const back = () => {
        router.back()
    }

    return (
        <Button style="w-min" noForm={back} mono>Back</Button>
    )
}

export { BackButton }
export default Navigation