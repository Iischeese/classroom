import Button from "../Button"
import { SubTitle } from "../Typography"

function Navigation({link, title}) {
    return (
        <div className="flex w-full justify-between items-center gap-2">
            <SubTitle>{title}</SubTitle>
            <Button style="w-min" mono link={link}>Back</Button>
        </div>
    )
}

export default Navigation