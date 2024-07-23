"use client"

import { updateValue, turnItIn } from "./actions";
import { Section, SectionContent, SectionFooter } from "@/components/Section";
import { Text, Heading } from "@/components/Typography";
import Error from "@/components/Error";
import Form from "@/components/dashboard/Form";
import FormButton from "@/components/dashboard/FormButton";

function Response({ response }) {

  if (response.message) {
    console.log(response);
    return (
      <Error
        title={"This assignment has not been added to your account."}
        desc={
          "You joined this classroom after the teacher created the assignment. Contact you teacher or IT department."
        }
      />
    );
  }

  let anw;

  switch (response.input) {
    case "TEXT":
      anw = response.response.TEXT;
      break;
    default:
      anw = response.response.TEXT;
      break;
  }

  async function update(formData) {
    await updateValue(response, response.input, formData.get("text"));
  }

  async function turnIN() {
    await turnItIn(response);
  }

  return (
    <>
      <Form>
        <Section disabled={response.submitted}>
          <SectionContent>
            <Heading>Your Work:</Heading>
            <textarea
              name="text"
              defaultValue={anw}
              className="bg-text/5 border border-text/40 rounded-md focus:outline-none p-3"
              onChange={async (e) => {
                await updateValue(response, response.input, e.target.value);
              }}
            />
          </SectionContent>
          <SectionFooter>
            <Text>Your progress will not auto-save.</Text>
            <div className="flex gap-2">
              <FormButton
                pendingText="Submitting..."
                formAction={turnIN}
                primary
                style="w-fit"
              >
                {response.submitted ? "Already submitted" : "Submit!"}
              </FormButton>
            </div>
          </SectionFooter>
        </Section>
      </Form>
    </>
  );
}

export default Response;
