'use client'

import Button from "@/components/Button"
import Input from "@/components/Input"
import Label from "@/components/Label"
import Title from "@/components/Title"
import { createClass } from "./actions"
import { useCallback, useEffect, useRef } from "react"
import { createClient } from "@/utils/supabase/client"

async function Create() {

    const supabase = createClient()

    const fileU = useRef(null)
    
    const process = ( async(e)=>{
        console.log("sdsdsd")

        let file = e.target.files[0]

        const {data: {user}} = await supabase.auth.getUser()

        const {data: {path}, error} = await supabase
            .storage
            .from('header-picture')
            .upload(user.id + '/' + uuidv4(), file)
    }, [])

    const handle = useCallback(()=>{fileU.current?.click()}, [])

    return (
        <>
            <main className="flex flex-col items-center justify-center w-screen h-[calc(100vh-5rem)]">
                <div className="border border-text/40 rounded-md p-5 flex flex-col gap-4">
                    <Title>Create a Class</Title>
                    <form className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <Label id='name'>Photo: </Label>
                            <Button noForm={handle} mono>Upload</Button>
                            <input onChange={process} className="hidden" ref={fileU} accept="image/*" type="file" name="photo" id="photo" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label id='name'>Name: </Label>
                            <Input mono id='name' name='name' placeholder='U.S History' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label id='level'>Grade Level: </Label>
                            <Input mono id='level' name='level' placeholder='8' />
                        </div>
                        <Button click={createClass} mono primary>Create</Button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Create