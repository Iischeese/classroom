'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

async function createClass(formData) {

    const supabase = createClient()

    const {data: {user}} = await supabase.auth.getUser()

    const formD = {
        name: formData.get('name'),
        grade_level: formData.get('level'),
        user_id: user.id,
        photo: formData.get('photo'),
    }

    const { data, error } = await supabase
        .from('classrooms')
        .insert([
            { user_id: formD.user_id, name: formD.name, grade_level: formD.grade_level},
        ])
        .select()

    if (!error) {
        redirect('/dashboard')
    }
    else {
        console.log(error.message)
    }

}


export { createClass }