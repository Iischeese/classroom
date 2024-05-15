'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

async function createClass(formData) {

    const supabase = createClient()

    const {data: {user}} = await supabase.auth.getUser()

    const photo = formData.get('photo')

    const {data, error:{message}} = await supabase.storage
        .from('header-picture')
        .upload(user.id + '/' + photo.name, photo);


    if(message){
        console.log(message)
    }

    const formD = {
        name: formData.get('name'),
        grade_level: formData.get('level'),
        user_id: user.id,
        photo: data.path,
    }


    const { data:{}, error } = await supabase
        .from('classrooms')
        .insert([
            { user_id: formD.user_id, name: formD.name, grade_level: formD.grade_level, header_photo: formD.photo}
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