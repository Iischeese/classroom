'use server'

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
        .eq('submitted', true)
        .eq('assignment_id', id)

    if (error) return error;

    return data
}

async function createResponse(id, user_id) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('responses')
        .insert({
            assignment_id: id,
            student_id: user_id,
            response: { "TEXT": "" },

        })
        .select('*')

    if(error) return error

    return data
}

export { updateValue, turnItIn, getResponses, createResponse }