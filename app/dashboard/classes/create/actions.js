'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

async function createClass(formData) {

    const supabase = createClient()

    const {data: {user}} = await supabase.auth.getUser()

    const photo = formData.get('photo')

    console.log(photo)

    const {data} = await supabase.storage
        .from('header-picture')
        .upload(user.id + '/' + photo.name, photo);

    const formD = {
        name: formData.get('name'),
        grade_level: formData.get('level'),
        user_id: user.id,
        photo: 'https://omlicebivegdzmftibvx.supabase.co/storage/v1/object/public/header-picture/' + data.path,
    }


    const { data: {user_id}, error } = await supabase
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