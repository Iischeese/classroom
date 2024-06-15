'use server'

import { getUserData } from "@/app/(setup)/login/actions"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

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
        .select('id')

    if (error) return error

    const { data: grade, error: gradeError } = await supabase
        .from('grades')
        .insert([{ response_id: data.id, grade: 0 }])

    if (gradeError) return gradeError
}


async function getAssignments(class_id) {
    const supabase = createClient()

    let { data: assignments, error } = await supabase
        .from('assignments')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('classroom_id', class_id)

    if (error) { console.error(error); return }

    return assignments
}

async function createAssignment(assig, id) {

    const supabase = createClient()

    const user = await getUserData()

    if (user.type == 'student') return

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
    }

    redirect(`/dashboard/classes/${id}/assignments/${assignment.id}`)

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

async function getResponseByID(id) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('responses')
        .select('*')
        .eq('id', id)
        .single()

    if (error) return error

    return data
}

async function setResponseViewed(response, bool) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('responses')
        .update({ is_viewed: bool })
        .eq('assignment_id', response.assignment_id)
        .eq('student_id', response.student_id)
        .single()

    if (error) console.error(error)
}

async function updateGrade(id, grade) {
    const supabase = createClient()

    const {data: response} = await supabase
        .from('responses')
        .update([{score: grade}])
        .eq('id', id)
        .single()
}

async function getGrade(id, viewUnreleased) {
    const supabase = createClient()

    const {data: response} = await supabase
        .from('responses')
        .select('*')
        .eq('id', id)
        .single()

    const {data: assignment} = await supabase
        .from('assignments')
        .select('score_released')
        .eq('id', response.assignment_id)
        .single()

    if(!assignment.score_released && !viewUnreleased) return null

    return response.score

}

async function releaseGrades(assignment_id, value){
    const supabase = createClient()

    const {data, error} = await supabase
        .from('assignments')
        .update([{score_released: value}])
        .eq('id', assignment_id)
        .single()

    if(error) return error

    revalidatePath('/dashboard/classes/[id]/assignments/[assignment]', 'page')

}

async function getAverageGrade(id, user_id){
    const supabase = createClient()

    const {data: classroom} = await supabase
        .from('classrooms')
        .select('id')
        .eq('id', id)
        .single()

    const { data: assignments, error } = await supabase
        .from('assignments')
        .select('id')
        .eq('score_released', true)
        .eq('classroom_id', classroom.id)

    let grades = []

    for(let i = 0; i < assignments.length; i++){
        const {data, error} = await supabase    
            .from('responses')
            .select('score')
            .eq('assignment_id', assignments[i].id)
            .single()

        grades.push(data.score)
    }


    let total = 0

    for(let i = 0; i < grades.length; i++){
        total = total + grades[i]
    }

    const final = total / grades.length

    return final
}

async function deleteAssignment(id) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', id)
        .select('*')
        .single()

    redirect('/dashboard/classes/' + data.classroom_id + '/assignments')
}

async function getAssignmentUrl(id) {
    const supabase = createClient()

    const { data: assignment, error } = await supabase
        .from('assignments')
        .select('classroom_id, id')
        .eq('id', id)
        .single()

    const { data: classroom } = await supabase
        .from('classroom')
        .select('id')
        .eq('id', assignment.classroom_id)
        .single()

    const url = '/dashboard/classes/' + classroom.id + '/assignments/' + assignment.id

    return url
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
    getAssignments,
    getResponseByID,
    updateGrade,
    getGrade,
    releaseGrades,
    getAverageGrade,
    deleteAssignment,
    getAssignmentUrl
}