import Button from "@/components/Button";
import { getResponse } from "./actions"
import {updateValue, turnItIn } from "./actions";
import { Section, SectionContent, SectionFooter } from "@/components/Section";
import { Text, Heading } from "@/components/Typography";
import Error from "@/components/Error";
import { revalidatePath } from "next/cache";
import { getUser } from "@/app/(setup)/login/actions";

async function Response({ id }) {

    const user = await getUser()

    const response = await getResponse(id ,user.id)

    if(response.message) {console.log(response); return <Error title={'This assignment has not been added to your account.'} desc={'You joined this classroom after the teacher created the assignment. Contact you teacher or IT department.'}/>}

    let anw

    switch (response.input) {
        case "TEXT":
            anw = response.response.TEXT
            break;
        default:
            anw = response.response.TEXT
            break;
    }

    async function update(formData) {
        'use server'
        updateValue(response, response.input, formData.get('text'))
    }

    async function turnIN(){
        'use server'
        await turnItIn(response)

        revalidatePath('/', 'layout')
    }


    return (
        <>
            <form>
                <Section disabled={response.submitted}>
                    <SectionContent>
                        <Heading>Your Work:</Heading>
                        <textarea onChangeCapture={update} name="text" defaultValue={anw} className="bg-text/5 border border-text/40 rounded-md focus:outline-none p-3" />
                    </SectionContent>
                    <SectionFooter>
                        <Text>Your progress will not auto-save.</Text>
                        <div className="flex gap-2">
                            <Button click={update} style="w-min">Save</Button>
                            <Button click={turnIN} primary style="w-fit">{ response.submitted ? "Submitted!" : "Turn it in!"}</Button>
                        </div>
                    </SectionFooter>
                </Section>
            </form>
        </>
    )
}

export default Response