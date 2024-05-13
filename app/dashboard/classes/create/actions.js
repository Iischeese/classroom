'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

async function createClassroom(formData){
    const supabase = createClient()
    
    const {data: {user}} = await supabase.auth.getUser()

    console.log(user.id)

    const {data, error} = await supabase
        .from('classrooms')
        .insert([
            {user_id: user.id},
            {name: formData.get('name')},
            {grade_level: formData.get('grade')},
        ])

    console.log(error.message)

    redirect('/dashboard')
}

export default createClassroom