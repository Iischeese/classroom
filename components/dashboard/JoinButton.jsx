'use client'

import Button from "../Button"
import Input from "../Input"
import Label from "../Label"

function JoinButton() {



    return (
        <form className="flex flex-col gap-4">
            <div>
                <Label id='code'>Join Code:</Label>
                <Input placeholder='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' name='code' id='code' />
            </div>
            <Button click={joinClassroom} primary>Join</Button>
        </form>
    )
}

export default JoinButton