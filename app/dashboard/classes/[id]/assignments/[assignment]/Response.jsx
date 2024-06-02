import Button from "@/components/Button";
import { getResponse } from "../../../actions"
import {updateValue, turnItIn } from "./actions";
import { Section, SectionContent, SectionFooter } from "@/components/Section";
import { Text, Heading } from "@/components/Typography";
import Error from "@/components/Error";

async function Response({ id, user }) {

    const response = await getResponse(id, user)

    if(response.message) {console.log(response); return <Error />}

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
        turnItIn(response)
    }


    return (
        <>
            <form>
                <Section disabled={response.submitted}>
                    <SectionContent>
                        <Heading>Your Work:</Heading>
                        <textarea name="text" defaultValue={anw} className="bg-text/5 border border-text/40 rounded-md focus:outline-none p-3" />
                    </SectionContent>
                    <SectionFooter>
                        <Text>Your progress will not auto-save.</Text>
                        <div className="flex gap-2">
                            <Button click={update} mono style="w-min">Save</Button>
                            <Button click={turnIN} mono primary style="w-fit">{ response.submitted ? "Already submitted!" : "Turn it in!"}</Button>
                        </div>
                    </SectionFooter>
                </Section>
            </form>
        </>
    )
}

export default Response