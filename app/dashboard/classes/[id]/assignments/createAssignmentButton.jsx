'use client'

import { useState } from "react"
import Button from "@/components/Button"
import Drawer from "@/components/Drawer"
import Form, { FormInput, TextArea } from "@/components/dashboard/Form"
import Label from "@/components/Label"
import Dropdown from "@/components/Dropdown"
import { createAssignment, deleteAssignment } from "./[assignment]/actions"
import Input from "@/components/Input"

function CreateAssignmentButton({id}) {

    const [open, setOpen] = useState(false)

    const create = async (formData) => {

        let formD = {
            name: formData.get('name'),
            type: formData.get('type'),
            due: formData.get('date'),
            desc: formData.get('desc')
        }

        if(formD.due == '') formD.due = new Date()

        await createAssignment(formD, id)

    }

    return (
        <>
            <Button noForm={()=>{setOpen(!open)}} primary>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                Assignment
            </Button>
            <Drawer open={open} setOpen={setOpen} title="New Assignment">
                <Form>
                    <FormInput id={"name"} label="Name" placeholder="Unit 20 Vocabulary Quiz"/>
                    <FormInput type={"date"} id={"date"} label="Due Date" placeholder="Unit 20 Vocabulary Quiz"/>
                    <div className="flex flex-col gap-2">
                        <Label>Type</Label>
                        <Dropdown name={'type'} options={['Homework', 'Quiz', 'Test']}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label id='desc'>Instructions</Label>
                        <TextArea id='desc'/>
                    </div>
                    <Button click={create}>Create</Button>
                </Form>
            </Drawer>
        </>
    )
}

export {CreateAssignmentButton}