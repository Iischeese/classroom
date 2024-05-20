import Button from "@/components/Button"
import Input from "@/components/Input"
import { Section, SectionContent, SectionFooter } from "@/components/Section"
import { SubTitle, Heading } from "@/components/Typography"
import { deleteClassroom, getClassroom, changeName } from "../../actions"
import { getUser, getUserData } from "@/app/(setup)/login/actions"
import Error from "@/components/Error"
import { redirect } from "next/navigation"

async function ClassroomSettings({ params }) {

    const isSignedIn = await getUser()

    if(!isSignedIn) redirect('/login')

    const id = params.id

    const classroom = await getClassroom(id)
    const user = await getUserData()

    const deleteClass = async () => {
        'use server'
        await deleteClassroom(id)
    }

    const changeNameOfClass = async () => {
        'use server'
        const error = await changeName(id, 'English')

        if(error) console.error(error.message)
    }

    const render = () => {
        return (
            <>
                <main className="w-full flex flex-col p-5 px-[20vw]">
                    <SubTitle>{classroom.name}&apos;s Configuration</SubTitle>    
                    <div className="flex flex-col gap-10 my-10">
                        <Section>
                            <SectionContent>
                                <h2 className="text-xl">Name</h2>
                                <p className="text-sm">This is the title of your classroom. For example: English, History, ect.</p>
                                <Input mono placeholder={classroom.name} id="name" name="name" />
                            </SectionContent>
                            <SectionFooter>
                                <p className="text-sm">Ensure length of title is less than 500 characters</p>
                                <form action="">
                                    <Button click={changeNameOfClass} style='w-min' mono primary>Save</Button>
                                </form>
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

    if (user.user_id == classroom.user_id) return render()
    
    
    return <Error title={"You don't own this classroom."} desc={"You must own this classroom to edit it. If this is a mistake contact your school head, or support"}/>


    
}

export default ClassroomSettings