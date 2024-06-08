'use server'

import { getUserData } from "@/app/(setup)/login/actions"
import { revalidatePath } from "next/cache"

const { createClient } = require("@/utils/supabase/server")

async function updateValue(res, type, value) {

    const supabase = createClient()

    const { error } = await supabase
        .from('responses')
        .update({ response: { 'TEXT': value } })
        .eq('student_id', res.student_id)
        .eq('assignment_id', res.assignment_id)
        .single()
}

async function turnItIn(res) {
    const supabase = createClient()

    const { error } = await supabase
        .from('responses')
        .update({ submitted: true })
        .eq('student_id', res.student_id)
        .eq('assignment_id', res.assignment_id)
        .single()

    if (error) console.error(error);

    revalidatePath('/', 'page')
}

async function getResponses(id) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('responses')
        .select('*')
        .eq('assignment_id', id)

    if (error) return error;

    return data
}

async function createResponse(assign_id, user_id) {

    const supabase = createClient()

    const { data, error } = await supabase
        .from('responses')
        .insert({
            assignment_id: assign_id,
            student_id: user_id,
            response: { "TEXT": "" },

        })
        .select('*')

    if (error) return error

    return data
}


async function getAssignments(class_id) {
    const supabase = createClient()

    let { data: assignments, error } = await supabase
        .from('assignments')
        .select('*')
        .order('created_at', {ascending:false})
        .eq('classroom_id', class_id)

    if (error) { console.error(error); return }

    return assignments
}

async function createAssignment(assig, id) {

    const supabase = createClient()

    const user = await getUserData()

    if(user.type == 'student') return

    const { data: assignment, error } = await supabase
        .from('assignments')
        .insert({ name: assig.name, type: assig.type, classroom_id: id, due_date: assig.due, description: assig.desc, input: "TEXT" })
        .select('id')
        .single()

    if (error) console.error(error.message)

    const { data: classroom } = await supabase
        .from('classrooms')
        .select('*')
        .eq('id', id)
        .single()


    for (let i = 0; i < classroom.students.length; i++) {
        const response = await createResponse(assignment.id, classroom.students[i])

        if (response.message) console.log(response)
    }

}

async function getAssignment(id) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('id', id)
        .single()

    if (error) return error

    return data
}

async function getResponse(assID, userID) {
    const supabase = createClient()

    const { data: response, error } = await supabase
        .from('responses')
        .select('*')
        .eq('assignment_id', assID)
        .eq('student_id', userID)
        .single()

    if (error) return error

    return response
}

async function setResponseViewed(response, bool) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('responses')
        .update({ is_viewed: bool })
        .eq('assignment_id', response.assignment_id)
        .eq('student_id', response.student_id)
        .select('*')
        .single()

    if (error) console.error(error)
}

export {
    updateValue,
    turnItIn,
    getResponses,
    createResponse,
    createAssignment,
    getAssignment,
    getResponse,
    setResponseViewed,
    getAssignments
}