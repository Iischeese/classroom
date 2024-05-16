import Button from "@/components/Button"
import Input from "@/components/Input"
import { Section, SectionContent, SectionFooter } from "@/components/Section"
import { Title, SubTitle } from "@/components/Typography"
import { getClassroom } from "../actions"
import { getUserData } from "@/app/(setup)/login/actions"

async function ClassroomSettings({ params }) {

    const id = params.id

    const classroom = await getClassroom(id)
    const user = await getUserData()

    return (
        <>
            <main className="w-full flex flex-col p-5 px-[20vw]">
                <Title>Settings for {classroom.name}</Title>
                <SubTitle>Taught by {user.prefix} {user.last_name}</SubTitle>
                <p className="text-sm text-text/20">[{id}]</p>

                <div className="flex flex-col gap-10 my-10">
                    <Section>
                        <SectionContent>
                            <h2 className="text-xl">Name</h2>
                            <p className="text-sm">This is the title of your classroom. For example: English, History, ect.</p>
                            <Input mono placeholder={classroom.name} id="name" name="name" />
                        </SectionContent>
                        <SectionFooter>
                            <p className="text-sm">Ensure length of title is less than 500 characters</p>
                            <Button style='w-min' mono primary>Save</Button>
                        </SectionFooter>
                    </Section>
                </div>
            </main>
        </>
    )
}

export default ClassroomSettings