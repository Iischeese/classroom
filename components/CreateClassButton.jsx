'use client'

import { useState, useRef, useCallback } from "react"
import Button from "./Button"
import Drawer from "./Drawer"
import Label from "@/components/Label"
import Form, { FormInput } from "@/components/dashboard/Form"
import FormButton from "@/components/dashboard/FormButton"
import { createClass, joinClassroom } from "@/app/dashboard/classes/actions"
function CreateClassButton() {

    const [open, setOpen] = useState(false)

    const fileU = useRef(null)

    const [file, setFile] = useState(false)

    const handle = useCallback(() => {
        fileU.current?.click()
    })

    const change = () => {
        setFile(URL.createObjectURL(fileU.current.files[0]))
    }

    return (
        <>
            <Button noForm={() => { setOpen(!open) }} style="min-w-fit w-max" primary>Create new classroom</Button>
            <Drawer size="sm" title="New Classroom" open={open} setOpen={setOpen}>
                <Form>
                    <FormInput placeholder="History" id="name" label="Name" />
                    <FormInput placeholder="9" id="level" label="Grade Level" />
                    <div className="flex flex-col gap-2">
                        <Label id='name'>Photo: </Label>
                        <input className="hidden" ref={fileU} onChange={change} accept="image/*" type="file" name="photo" id="photo" />
                        <input className="w-full bg-secondary border-text/40 border p-3 rounded-md" value="Upload" type="button" onClick={handle} />
                        {
                            file ?
                                <div className="w-full bg-secondary relative aspect-video rounded-md overflow-clip border-text/40 border">
                                    <img className="absolute object-cover w-full h-full" src={file} />
                                </div>
                                :
                                <></>
                        }
                    </div>
                    <FormButton pendingText="Creating" formAction={createClass} primary>Create</FormButton>
                </Form>
            </Drawer>
        </>
    )
}

function JoinClassButton() {

    const [open, setOpen] = useState(false)

    return (
        <>
            <Button noForm={() => { setOpen(!open) }} primary style="w-min min-w-fit">Join Class</Button>
            <Drawer title="Join Class" open={open} setOpen={setOpen}>
                <Form>
                    <FormInput id="code" label="Join Code" placeholder="FQdhwzE" />
                    <Button click={joinClassroom}>Join</Button>
                </Form>
            </Drawer>
        </>
    )
}

export { CreateClassButton, JoinClassButton }