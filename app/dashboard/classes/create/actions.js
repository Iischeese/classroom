'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

async function createClass(formData) {

    const supabase = createClient()

    const {data: {user}} = await supabase.auth.getUser()

    const photo = formData.get('photo')

    let Path = ''

    const {data} = await supabase.storage
        .from('header-picture')
        .upload(user.id + '/' + photo.name, photo)

    if(!data) {
        const {data} = await supabase.storage
        .from('header-picture')
        .getPublicUrl(user.id+'/'+photo.name)

        Path = data.publicUrl
    }
    else {
        const {data: {path}} = await supabase.storage
        .from('header-picture')
        .getPublicUrl(data.path)

        Path = path
    }

    const formD = {
        name: formData.get('name'),
        grade_level: formData.get('level'),
        user_id: user.id,
        photo: Path,
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