import Button from "@/components/Button";
import Input from "@/components/Input";
import {
  Section,
  SectionContent,
  SectionFooter,
  SectionFooterButtons,
} from "@/components/Section";
import { Heading, Text } from "@/components/Typography";
import {
  deleteClassroom,
  getClassroom,
  changeName,
  updateGradingCycleCount,
  rollCycleForward,
} from "../../actions";
import { getUserData } from "@/app/(home)/login/actions";
import Error from "@/components/Error";
import Image from "next/image";
import SettingsContainer, {
  Content,
} from "@/components/dashboard/SettingsContainer";
import Navigation from "@/components/dashboard/Navigation";
import Form, { FormInput } from "@/components/dashboard/Form";
import FormButton from "@/components/dashboard/FormButton";

export const metadata = {
  title: "Classroom Settings",
};

async function ClassroomSettings({ params }) {
  const id = params.id;

  const classroom = await getClassroom(id);
  if (classroom.message) return <Error />;
  const user = await getUserData();

  if (user.user_id !== classroom.user_id)
    return <Error title="You are not the owner of this classroom." />;

  const deleteClass = async () => {
    "use server";
    await deleteClassroom(id);
  };

  return (
    <>
      <SettingsContainer>
        <Content>
          <Navigation
            title={`Classroom Settings`}
            link={`/dashboard/classes/${id}`}
          />
          <Section>
            <form>
              <SectionContent>
                <Heading>Name</Heading>
                <Text>
                  This is the title of your classroom. For example: English,
                  History, ect.
                </Text>
                <FormInput id="name" placeholder={classroom.name} />
              </SectionContent>
              <SectionFooter>
                <Text className="text-sm">
                  Ensure length of title is less than 500 characters
                </Text>
                <FormButton
                  style="w-min"
                  pendingText="Saving"
                  primary
                  formAction={async (formData) => {
                    "use server";
                    await changeName(classroom.id, formData.get("name"));
                  }}
                >
                  Save
                </FormButton>
              </SectionFooter>
            </form>
          </Section>
          <Section>
            <SectionContent>
              <Heading>Heading Photo</Heading>
              <Text>
                The photo that appears on the top of your class page. It&apos;s
                size could change on different devices; Make sure your image is
                large enough to accommodate.
              </Text>
              <div className="w-full flex gap-2 items-center">
                <div className="w-1/2 aspect-video rounded-md overflow-clip relative">
                  <Image
                    alt="Your current classroom photo"
                    className="w-full h-full absolute object-cover"
                    width={300}
                    height={200}
                    src={classroom.header_photo}
                  />
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
          <Section>
            <form>
              <SectionContent>
                <Heading>Grading Periods</Heading>
                <Text>
                  Grading periods, or cycles are the amount of time that
                  students have until their final grade averages are released.
                  These periods will be averaged at the end of the academic year
                  to generate a end of year assessment, report card, and GPA. We
                  recommend four cycles.
                </Text>
                <Text>
                  <strong>
                    Your current cycle is: {classroom.current_quarter} out of{" "}
                    {classroom.quarters}
                  </strong>
                </Text>
                <FormInput
                  label="Amount of cycles"
                  id="cycles"
                  defaultValue={classroom.quarters}
                ></FormInput>
              </SectionContent>
              <SectionFooter>
                <Text></Text>
                <SectionFooterButtons>
                  <FormButton
                    type="submit"
                    pendingText={"Saving"}
                    formAction={async (formData) => {
                      "use server";

                      await updateGradingCycleCount(
                        formData.get("cycles"),
                        classroom.id
                      );
                    }}
                    primary
                    style="w-min"
                  >
                    Save
                  </FormButton>
                  <FormButton
                    pendingText={"Starting new cycle"}
                    danger
                    style="w-min"
                    formAction={async () => {
                      "use server";

                      await rollCycleForward(classroom.id);
                    }}
                  >
                    Forward Cycle
                  </FormButton>
                </SectionFooterButtons>
              </SectionFooter>
            </form>
          </Section>
          <Section danger>
            <SectionContent>
              <Heading>Delete Classroom</Heading>
              <Text>
                {classroom.name} will be permanently deleted, along with all the
                posts, assignments, and grades. This cannot be undone.
              </Text>
            </SectionContent>
            <SectionFooter danger>
              <div></div>
              <Form min>
                <FormButton
                  danger
                  formAction={deleteClass}
                  pendingText="Deleting..."
                >
                  Delete
                </FormButton>
              </Form>
            </SectionFooter>
          </Section>
        </Content>
      </SettingsContainer>
    </>
  );
}

export default ClassroomSettings;
