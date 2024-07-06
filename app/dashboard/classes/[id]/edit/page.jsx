import Button from "@/components/Button"
import Input from "@/components/Input"
import { Section, SectionContent, SectionFooter } from "@/components/Section"
import { Heading, Text } from "@/components/Typography"
import { deleteClassroom, getClassroom, changeName } from "../../actions"
import { getUserData } from "@/app/(home)/login/actions"
import Error from "@/components/Error"
import Image from "next/image"
import SettingsContainer, { Content } from "@/components/dashboard/SettingsContainer"
import Navigation from "@/components/dashboard/Navigation"

export const metadata = {
    title: 'Classroom Settigns'
}

async function ClassroomSettings({ params }) {

    const id = params.id

    const classroom = await getClassroom(id)
    if (classroom.message) return <Error />
    const user = await getUserData()

    if (!user.user_id == classroom.user_id) return <Error />

    const deleteClass = async () => {
        'use server'
        await deleteClassroom(id)
    }

    const changeNameOfClass = async () => {
        'use server'
        const error = await changeName(id, 'English')

        if (error) console.error(error.message)
    }

    return (
        <>
            <SettingsContainer>
                <Content>
                    <Navigation title={`Classroom Settings`} link={`/dashboard/classes/${id}`} />
                    <div className="flex flex-col gap-10 my-10">
                        <Section>
                            <SectionContent>
                                <Heading>Name</Heading>
                                <Text>This is the title of your classroom. For example: English, History, ect.</Text>
                                <Input type="text" placeholder={classroom.name} />
                            </SectionContent>
                            <SectionFooter>
                                <Text className="text-sm">Ensure length of title is less than 500 characters</Text>
                                <form action="">
                                    <input id="name" name="name" type="text" className="hidden" />
                                    <Button click={changeNameOfClass} style='w-min' primary>Save</Button>
                                </form>
                            </SectionFooter>
                        </Section>
                        <Section>
                            <SectionContent>
                                <Heading>Heading Photo</Heading>
                                <Text>The photo that appears on the top of your class page. It&apos;s size could change on different devices; Make sure your image is large enough to accommodate.</Text>
                                <div className="w-full flex gap-2 items-center">
                                    <div className="w-1/2 aspect-video rounded-md overflow-clip relative">
                                        <Image alt="Your current classroom photo" className="w-full h-full absolute object-cover" width={300} height={200} src={classroom.header_photo} />
                                    </div>
                                    <div className="border border-text/40 w-1/2 aspect-video rounded-md overflow-clip relative flex justify-center items-center bg-text/10">
                                        <Heading>Upload</Heading>
                                    </div>
                                </div>
                            </SectionContent>
                            <SectionFooter>
                                <Text>Ensure that it is no larger than 50MB.</Text>
                                <form>
                                    <Button primary>Save</Button>
                                </form>
                            </SectionFooter>
                        </Section>
                        <Section danger>
                            <SectionContent>
                                <Heading>Delete Classroom</Heading>
                                <Text>{classroom.name} will be permanently deleted, along with all the posts, assignments, and grades. This cannot be undone.</Text>
                            </SectionContent>
                            <SectionFooter danger>
                                <div></div>
                                <form>
                                    <Button click={deleteClass} danger style='w-min'>Delete</Button>
                                </form>
                            </SectionFooter>
                        </Section>
                    </div>
                </Content>
            </SettingsContainer>
        </>
    )
}


export default ClassroomSettings