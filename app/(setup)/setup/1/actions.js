'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

async function setupUser(formData) {

    const supabase = createClient()

    let teach

    if (formData.get('teach') == "am") teach = true
    else teach = false

    const formD = {
        fname: formData.get('fname'),
        lname: formData.get('lname'),
        teach: teach,
        prefix: formData.get('prefix'),
    }

    const { data, error } = await supabase
        .from('users')
        .insert([
            { first_name: formD.fname, last_name: formD.lname, isTeacher: formD.teach, prefix: formD.prefix, enrolled_classes: [] },
        ])
        .select()

    if (!error) {
        redirect('/dashboard')
    }
    else {
        redirect('/error')
    }

}


export { setupUser }