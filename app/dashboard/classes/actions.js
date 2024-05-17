'use server'

import { getUser, getUserData } from "@/app/(setup)/login/actions"
import { createClient } from "@/utils/supabase/server"
import { createServerClient } from "@supabase/ssr"
import { redirect } from "next/navigation"
import { cookies } from 'next/headers'


async function getClassrooms() {
    const supabase = createClient()

    const user = await getUserData()

    if (user.isTeacher) {
        const { data, error } = await supabase
            .from('classrooms')
            .select('*')
            .eq('user_id', user.user_id)

        if (error) return

        return data
    }
    else {

        const { data, error } = await supabase
            .from('classrooms')
            .select('*')
            .in('id', user.enrolled_classes)

        if (error) { console.error(error.code + ': ' + error.message + '\n' + error.details); return [] }
        else return data
    }
}

async function getClassroom(id) {

    const supabase = createClient()

    const { data, error } = await supabase
        .from('classrooms')
        .select('*')
        .eq('id', id)
        .single()

    if (error) return error

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

    if (error) { console.log(error.message); return }

    redirect('/dashboard')

}

async function joinClassroom(formData) {

    const cookieStore = cookies()
 
    const ClassID = formData.get('code')

    const supabase = createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { cookies: {} })

    const user = await getUserData()

    const { data: { students }, error } = await supabase
        .from('classrooms')
        .select('*')
        .eq('id', ClassID)
        .single()

    if (error) console.log(error.message)

    const studentsArray = students.concat(user.user_id)

    const classroom = await supabase
        .from('classrooms')
        .update({ students: studentsArray })
        .eq('id', ClassID)
        .select()

    if(classroom.error) console.error(classroom.error.message)

    const classesArray = user.enrolled_classes.concat(ClassID)

    const newUser = await supabase
        .from('users')
        .update({ enrolled_classes: classesArray })
        .eq('user_id', user.user_id)
        .select()

    redirect('/dashboard/classes/' + ClassID)
}

export { getClassrooms, getClassroom, deleteClassroom, joinClassroom }