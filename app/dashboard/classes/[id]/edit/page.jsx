import Button from "@/components/Button"
import Input from "@/components/Input"
import { Section, SectionContent, SectionFooter } from "@/components/Section"
import { SubTitle, Heading } from "@/components/Typography"
import { deleteClassroom, getClassroom } from "../../actions"
import { getUserData } from "@/app/(setup)/login/actions"
import { redirect } from "next/dist/server/api-utils"
import Error from "@/components/Error"

async function ClassroomSettings({ params }) {

    const id = params.id

    const classroom = await getClassroom(id)
    const user = await getUserData()

    if(!user.user_id == classroom.user_id) return <Error />

    const deleteClass = async () => {
        'use server'
        await deleteClassroom(id)
    }

    return (
        <>
            <main className="w-full flex flex-col p-5 px-[20vw]">
                <SubTitle>Settings for {classroom.name}</SubTitle>
                <Heading>Taught by {user.prefix} {user.last_name}</Heading>

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
                    <Section danger>
                        <SectionContent>
                            <Heading>Delete Classroom</Heading>
                            <p className="text-sm">{classroom.name} will be permanently deleted, along with all the posts, assignments, and grades. This cannot be undone.</p>
                        </SectionContent>
                        <SectionFooter danger>
                            <div></div>
                            <form>
                                <Button click={deleteClass} danger style='w-min'>Delete</Button>
                            </form>
                        </SectionFooter>
                    </Section>
                </div>
            </main>
        </>
    )
}

export default ClassroomSettings