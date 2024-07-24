"use client";

import Button from "@/components/Button";
import Form, { FormInput, FormSpace } from "@/components/dashboard/Form";
import TipTap from "@/components/dashboard/TipTap";
import Drawer from "@/components/Drawer";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import Label from "@/components/Label";
import { useState, useEffect } from "react";
import { getAssignment, updateAssignment } from "./actions";
import FormButton from "@/components/dashboard/FormButton";

function EditAssignmentButton({ assignment }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({})
  const [text, setText] = useState({})

  useEffect(()=>{
    const get = async () => {
        const res = await getAssignment(assignment.id)
        setValue(res.description)
        setText(res.description)
    }

    get()
  }, [])

  const send = async (formData) => {

    const values = {
        name: formData.get('name'),
        type: formData.get('type'),
        due_date: formData.get('date'),
        description: text,
    }

    const error = await updateAssignment(assignment.id, values)

    if(error) console.error(error)
  }

  return (
    <>
      <Button
        noForm={() => {
          setOpen(!open);
        }}
      >
        Edit
      </Button>
      <Drawer size="lg" title="Edit Assignment" open={open} setOpen={setOpen}>
        <Form>
          <FormInput label="Name" id="name" defaultValue={assignment.name} />
          <FormSpace>
            <Label id="type">Type: </Label>
            <Dropdown defaultValue={assignment.type} name="type" options={["QUIZ", "TEST", "HOMEWORK"]} />
          </FormSpace>
          <FormSpace>
            <Label id="date">Due Date:</Label>
            <Input defaultValue={assignment.due_date} id="date" name="date" type="date" />
          </FormSpace>
          <FormSpace>
            <Label id="details">Instructions:</Label>
            <TipTap defaultValue={value} setItem={setText} />
          </FormSpace>
          <FormSpace>
            <FormButton pendingText="Updating" primary formAction={send}>Update</FormButton>
          </FormSpace>
        </Form>
      </Drawer>
    </>
  );
}

export default EditAssignmentButton;
