'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

async function setupUser(formData) {

    const supabase = createClient()

    let teach

    if (formData.get('teach') == "am") teach = "teacher"
    else teach = "student"

    const formD = {
        fname: formData.get('fname'),
        lname: formData.get('lname'),
        teach: teach,
        prefix: formData.get('prefix'),
    }

    const { data, error } = await supabase
        .from('users')
        .insert([
            { first_name: formD.fname, last_name: formD.lname, type: formD.teach, prefix: formD.prefix, enrolled_classes: [], assignments: [] },
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