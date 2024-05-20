import { getUser, getUserData, signOut } from "@/app/(setup)/login/actions"
import Button from "@/components/Button"
import Input from "@/components/Input"
import { Section, SectionContent, SectionFooter } from "@/components/Section"
import { Title, Heading, Text } from "@/components/Typography"
import SettingsContainer from "@/components/dashboard/SettingsContainer"
import { redirect } from "next/navigation"

async function Account() {

    const user = await getUser()
    if (!user) redirect('/login')

    const userData = await getUserData()

    return (
        <SettingsContainer>
            <Title>Account Settings</Title>
            <div className="flex flex-col gap-10 my-10">
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
                        <div></div>
                        <Button primary mono style="w-min">Save</Button>
                    </SectionFooter>
                </Section>
                <Section danger>
                    <SectionContent>
                        <Heading>Sign Out</Heading>
                        <Text>This will sign you out of all your devices signed in to this account.</Text>
                    </SectionContent>
                    <SectionFooter danger>
                        <div></div>
                        <form action="">
                            <Button click={signOut} primary danger style="w-fit w-max-min">
                                Log-Out
                            </Button>
                        </form>
                    </SectionFooter>
                </Section>
            </div>
        </SettingsContainer>
    )
}

export default Account