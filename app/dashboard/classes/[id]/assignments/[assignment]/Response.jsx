"use client";

import { updateValue, turnItIn, getResponseByID } from "./actions";
import { Section, SectionContent, SectionFooter } from "@/components/Section";
import { Text, Heading } from "@/components/Typography";
import Error from "@/components/Error";
import Form from "@/components/dashboard/Form";
import FormButton from "@/components/dashboard/FormButton";
import { useEffect, useState } from "react";
import TipTap from "@/components/dashboard/TipTap";
import Button from "@/components/Button";

function Response({ response }) {
  const [item, setItem] = useState({});
  const [value, setValue] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await getResponseByID(response.id);
      setValue(res.response.TEXT);
    };

    fetch();
  }, []);

  useEffect(() => {
    updateValue(response, JSON.stringify(item));
  }, [item]);

  return (
    <>
      <Section disabled={response.submitted}>
        <SectionContent>
          <Heading>Your Work</Heading>
          <TipTap readOnly={response.submitted} defaultValue={value} setItem={setItem} />
        </SectionContent>
        <SectionFooter>
          {!response.submitted ? (
            <>
              <Text>Your work will auto-save</Text>
              <Form min>
                <FormButton
                  pendingText="Submitting..."
                  formAction={async () => {
                    await turnItIn(response);
                  }}
                >
                  Submit
                </FormButton>
              </Form>
            </>
          ) : (
            <>
              <Text>
                Your work cannot be edited because you have already submitted
                it.
              </Text>
            </>
          )}
        </SectionFooter>
      </Section>
    </>
  );
}

export default Response;
