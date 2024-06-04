'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { generateJoinCode } from "../actions"
import Error from "@/components/Error"

async function createClass(formData) {

    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    const photo = formData.get('photo')

    const setPhoto = async () => {
        const { data } = await supabase.storage
            .from('header-picture')
            .upload(user.id + '/' + photo.name, photo)

        const getURL = async () => {
            const { data } = await supabase.storage
                .from('header-picture')
                .getPublicUrl(user.id + '/' + photo.name)

                return data.publicUrl
        }

        return getURL()
    }

    const Path = await setPhoto()

    const formD = {
        name: formData.get('name'),
        grade_level: formData.get('level'),
        user_id: user.id,
        photo: Path,
    }


    const { data, error } = await supabase
        .from('classrooms')
        .insert([
            { join_code: generateJoinCode(), user_id: formD.user_id, name: formD.name, grade_level: formD.grade_level, header_photo: formD.photo, students: [] }
        ])
        .select('*')
        .single()

    if (!error) {
        redirect(`/dashboard/classes/${data.id}`)
    }
    else {
        console.log(error.message)
        return redirect('/error')
    }

}


export { createClass }