import { getUserData, signOut } from "@/app/(home)/login/actions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Section, SectionContent, SectionFooter } from "@/components/Section";
import { Heading, Text } from "@/components/Typography";
import Navigation from "@/components/dashboard/Navigation";
import ProfilePic from "@/components/dashboard/Profile";
import SettingsContainer, {
  Content,
} from "@/components/dashboard/SettingsContainer";
import Form from "@/components/dashboard/Form";
import FormButton from "@/components/dashboard/FormButton";
export const metadata = {
  title: "Account Settings",
};

async function Account() {
  const userData = await getUserData();

  return (
    <SettingsContainer>
      <Content>
        <Navigation title={"Account Settings"}>
          {userData.user_id == "5f8b3f57-9dc7-4e4f-bddd-1370817e86ee" ? (
            <Button primary link="/admin">
              Admin
            </Button>
          ) : (
            ""
          )}
        </Navigation>
        <Section>
          <SectionContent>
            <Heading>Name</Heading>
            <Text>
              Your first and last name. This will be used to identify you to
              others.
            </Text>
            <div className="flex gap-8">
              <Input placeholder={userData.first_name} />
              <Input placeholder={userData.last_name} />
            </div>
          </SectionContent>
          <SectionFooter>
            <div></div>
            <Button primary style="w-min">
              Save
            </Button>
          </SectionFooter>
        </Section>
        <Section>
          <SectionContent>
            <Heading>Profile Picture</Heading>
            <div className="flex gap-8">
              <Text>
                The public picture that will represent you. Shows up by your
                name, classes ect.
              </Text>
              <div className="w-1/4">
                {" "}
                <ProfilePic />
              </div>
            </div>
          </SectionContent>
          <SectionFooter>
            <Text>Not to exceed 50MB.</Text>
            <Button primary style="w-min">
              Save
            </Button>
          </SectionFooter>
        </Section>
        <Section danger>
          <SectionContent>
            <Heading>Sign Out</Heading>
            <Text>
              This will sign you out of all your devices signed in to this
              account.
            </Text>
          </SectionContent>
          <SectionFooter danger>
            <div className="w-full" />
            <Form min>
              <FormButton
                style="whitespace-nowrap"
                danger
                pendingText="Logging Out"
                formAction={signOut}
              >
                Log Out
              </FormButton>
            </Form>
          </SectionFooter>
        </Section>
      </Content>
    </SettingsContainer>
  );
}

export default Account;
