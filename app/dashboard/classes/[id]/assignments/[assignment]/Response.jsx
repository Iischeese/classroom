"use client";

import { updateValue, turnItIn, getResponse, requestUnSubmit } from "./actions";
import { Section, SectionContent, SectionFooter } from "@/components/Section";
import { Text, Heading } from "@/components/Typography";
import Error from "@/components/Error";
import Form from "@/components/dashboard/Form";
import FormButton from "@/components/dashboard/FormButton";
import TipTap from "@/components/dashboard/TipTap";
import { useEffect, useState } from "react";

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

  async function turnIN() {
    await turnItIn(response);
  }

  const [item, setItem] = useState({});
  const [defaultValue, setDefaultValue] = useState({});

  useEffect(() => {
    async function getResponseData() {
      const res = await getResponse(
        response.assignment_id,
        response.student_id
      );
      setDefaultValue(res.response.TEXT);
    }

    getResponseData();
  }, []);

  useEffect(() => {
    async function update() {
      await updateValue(response, JSON.stringify(item));
    }

    update();
  }, [item]);

  return (
    <>
      <Form>
        <Section>
          <SectionContent disabled={response.submitted}>
            <Heading>Your Work:</Heading>
            <TipTap defaultValue={defaultValue} setItem={setItem} />
          </SectionContent>
          <SectionFooter>
            <div />
            <div className="flex gap-2">
              {response.submitted ? (
                <FormButton
                  pendingText="Asking..."
                  formAction={async ()=>{await requestUnSubmit(response)}}
                  primary
                  style="w-fit"
                >
                  Ask teacher to return
                </FormButton>
              ) : (
                <FormButton
                  pendingText="Submitting..."
                  formAction={turnIN}
                  primary
                  style="w-fit"
                >
                  Submit
                </FormButton>
              )}
            </div>
          </SectionFooter>
        </Section>
      </Form>
    </>
  );
}

export default Response;
