'use server'

import { getUserData } from "@/app/(setup)/login/actions"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

async function getClassrooms() {
    const supabase = createClient()

    const user = await getUserData()

    const { data, error } = await supabase
        .from('classrooms')
        .select('*')
        .eq('user_id', user.user_id)

    if (error) return

    return data
}

async function getClassroom(id) {

    const supabase = createClient()

    const { data, error } = await supabase
        .from('classrooms')
        .select('*')
        .eq('id', id)
        .single()

    if (error) return

    return data

}

async function deleteClassroom(id) {

    console.log("DELETE: " + id)

    const supabase = createClient()

    const user = await getUserData()

    const { error } = await supabase
        .from('classrooms')
        .delete()
        .eq('id', id)

    if(error) {console.log(error.message); return}

    redirect('/dashboard')


}

export { getClassrooms, getClassroom, deleteClassroom }