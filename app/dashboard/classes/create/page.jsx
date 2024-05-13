import Button from "@/components/Button"
import Input from "@/components/Input"
import Label from "@/components/Label"
import Title from "@/components/Title"
import createClassroom from "./actions"

function Create(){
    return(
        <>
            <main className="flex flex-col items-center justify-center w-screen h-[calc(100vh-5rem)]">
                <div className="border border-text rounded-md p-5 flex flex-col gap-4">
                    <Title>Create a Class</Title>
                    <form className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <Label id='name'>Name: </Label>
                            <Input mono id='name' name='name' placeholder='U.S History'/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label id='level'>Grade Level: </Label>
                            <Input mono id='level' name='level' placeholder='8'/>
                        </div>
                        <Button click={createClassroom} mono primary>Create</Button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Create