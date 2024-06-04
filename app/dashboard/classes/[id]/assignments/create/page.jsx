import { SubTitle, Title } from "@/components/Typography"
import Label from "@/components/Label"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Dropdown from "@/components/Dropdown"
import { createAssignment } from "../[assignment]/actions"
import SettingsContainer from "@/components/dashboard/SettingsContainer"
import { redirect } from "next/navigation"
import Navigation from "@/components/dashboard/Navigation"

function CreateAssignment({ params }) {

    const create = async (formData) => {
        'use server'

        let formD = {
            name: formData.get('name'),
            type: formData.get('type'),
            due: formData.get('date'),
            desc: formData.get('desc')
        }

        if(formD.due == '') formD.due = new Date()

            await createAssignment(formD, params.id)

        redirect(`/dashboard/classes/${params.id}`)
    }

    return (
        <>
            <SettingsContainer>
                <div className="rounded-md p-5 flex flex-col gap-4 w-full">
                    <Navigation title="Create an assignment"/>
                    <form className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <Label id='name'>Name: </Label>
                            <Input id="name" name='name' mono placeholder="Stage 20 Vocab Quiz" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label id='type'>Type: </Label>
                            <Dropdown mono id='type' name='type' options={['TEST', 'QUIZ', 'HMWK']} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label id='date'>Due Date: </Label>
                            <input className="bg-text/5 border border-text/40 rounded-md p-3" type="date" name="date" id="date" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label id='desc'>Instructions </Label>
                            <textarea className="bg-text/5 border border-text/40 rounded-md p-3" name="desc" id="desc"></textarea>
                        </div>
                        <Button click={create} mono primary>Create</Button>
                    </form>
                </div>
            </SettingsContainer>
        </>
    )
}

export default CreateAssignment