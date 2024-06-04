import Button from "@/components/Button"
import Input from "@/components/Input"
import Label from "@/components/Label"
import { SubTitle } from "@/components/Typography"
import { joinClassroom } from "../actions"

async function Join() {

    return (
        <>
            <main className="flex flex-col items-center justify-center w-screen h-[calc(100vh-5rem)]">
                <div className="border border-text/40 rounded-md p-5 flex flex-col gap-4">
                    <SubTitle>Join a Class</SubTitle>
                    <form className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <Label id='code'>Code: </Label>
                            <Input placeholder={'XXXXXXX'} id='code' name='code'/>
                        </div>
                        <Button click={joinClassroom} mono primary>Join</Button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Join