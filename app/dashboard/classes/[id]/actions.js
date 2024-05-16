'use server'

import { createClient } from "@/utils/supabase/server"

async function getClassroom(id) {

    const supabase = createClient()

    const { data, error } = await supabase
        .from('classrooms')
        .select('*')
        .eq('id', id)
        .single()

    if(error) return

    return data

}

export {getClassroom}