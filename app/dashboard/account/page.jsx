import { getUser, getUserData } from "@/app/(setup)/login/actions"
import Input from "@/components/Input"
import { Section, SectionContent, SectionFooter } from "@/components/Section"
import { Title, Heading, Text } from "@/components/Typography"
import { redirect } from "next/dist/server/api-utils"

async function Account() {

    const user = await getUser()
    const userData = await getUserData()

    if (!user) redirect('/login')

    return (
        <main className="w-full flex flex-col p-5 px-[20vw]">
            <Title>Preferences</Title>
            <div className="gap-10 my-10">
                <Section>
                    <SectionContent>
                        <Heading>Name</Heading>
                        <Text>Your first and last name. This will be used to identify you to others.</Text>
                        <div className="flex gap-8">
                            <Input mono placeholder={userData.first_name} />
                            <Input mono placeholder={userData.last_name} />
                        </div>
                    </SectionContent>
                    <SectionFooter>

                    </SectionFooter>
                </Section>
            </div>
        </main>
    )
}

export default Account