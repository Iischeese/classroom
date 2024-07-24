"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import Form, { FormInput, FormSpace } from "@/components/dashboard/Form";
import Input from "@/components/Input";
import FormButton from "@/components/dashboard/FormButton";
import Label from "@/components/Label";
import Dropdown from "@/components/Dropdown";
import { createAssignment, deleteAssignment } from "./[assignment]/actions";
import TipTap from "@/components/dashboard/TipTap";

function CreateAssignmentButton({ id }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState({});

  const create = async (formData) => {
    let formD = {
      name: formData.get("name"),
      type: formData.get("type"),
      due: formData.get("date"),
      desc: JSON.stringify(text),
    };

    if (formD.due == "") formD.due = new Date();

    await createAssignment(formD, id);
  };

  return (
    <>
      <Button
        noForm={() => {
          setOpen(!open);
        }}
        primary
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Assignment
      </Button>
      <Drawer open={open} setOpen={setOpen} title="New Assignment">
        <Form>
          <FormInput label="Name" id="name" />
          <FormSpace>
            <Label id="type">Type: </Label>
            <Dropdown name="type" options={["QUIZ", "TEST", "HOMEWORK"]} />
          </FormSpace>
          <FormSpace>
            <Label id="date">Due Date:</Label>
            <Input id="date" name="date" type="date" />
          </FormSpace>
          <FormSpace>
            <Label id="details">Instructions:</Label>
            <TipTap setItem={setText} />
          </FormSpace>
          <FormSpace>
            <FormButton pendingText="Creating" primary formAction={create}>
              Create
            </FormButton>
          </FormSpace>
        </Form>
      </Drawer>
    </>
  );
}

export { CreateAssignmentButton };
