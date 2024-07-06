'use server'

import { getUserData } from "@/app/(home)/login/actions"
import { createClient } from "@/utils/supabase/server"
import { createServerClient } from "@supabase/ssr"
import { redirect } from "next/navigation"
import { cookies } from 'next/headers'
import { revalidatePath } from "next/cache"
import { getUser } from "@/app/(home)/login/actions"

async function createClass(formData) {

    const supabase = createClient()

    const user = await getUser()

    const photo = formData.get('photo')

    const setPhoto = async () => {
        const { data, error } = await supabase.storage
            .from('header-picture')
            .upload(user.id + '/' + photo.name, photo)

        const getURL = () => {
            const { data } = supabase.storage
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
        .select('id')
        .single()

    if (!error) {
        redirect(`/dashboard/classes/${data.id}`)
    }
    else {
        console.log(error.message)
        return redirect('/error')
    }

}

async function getClassrooms() {
    const supabase = createClient()

    const user = await getUserData()

    if (user.type == "teacher") {
        const { data, error } = await supabase
            .from('classrooms')
            .select('name, user_id, grade_level, id, header_photo')
            .eq('user_id', user.user_id)
            .order('created_at', { ascending: false })

        if (error) return

        return data
    }
    else {

        const { data, error } = await supabase
            .from('classrooms')
            .select('name, user_id, grade_level, id, header_photo')
            .in('id', user.enrolled_classes)
            .order('created_at', { ascending: true })

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

    if (error) { return error }

    return data

}

async function deleteClassroom(id) {

    console.log("DELETE CLASS: " + id)

    const supabase = createClient()

    // delete the classroom
    const { data: classroom, error: classError } = await supabase
        .from('classrooms')
        .delete()
        .eq('id', id)
        .select('user_id, header_photo')
        .single()

    if (classError) { console.error(classError); return }

    // delete the assignments associated with it
    const { data: assignmentData, error: assignmentError } = await supabase
        .from('assignments')
        .delete()
        .eq('classroom_id', id)
        .select('id')

    if (assignmentError) { console.error(assignmentError); return }

    // delete all the student responses
    for (let i = 0; i < assignmentData.length; i++) {

        console.log(assignmentData[i])

        const { error: responsesError } = await supabase
            .from('responses')
            .delete()
            .eq('assignment_id', assignmentData[i].id)

        if (responsesError) { console.error(responsesError); return }
    }

    // delete header photo from storage (not working GRRRR! :/ )
    const string = classroom.header_photo

    const url = string.split('/')

    const path = classroom.user_id + '/' + url[url.length - 1]

    await supabase.storage.from('header-picture').remove([path])

    redirect('/dashboard')

}

async function changeName(id, newName) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('classrooms')
        .update({ name: newName })
        .eq('id', id)

    if (error) return error

    revalidatePath('/', 'page')
}

async function joinClassroom(formData) {

    const cookieStore = cookies()

    const code = formData.get('code')

    const supabase = createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { cookies: {} })

    const user = await getUserData()

    const { data: { students }, error } = await supabase
        .from('classrooms')
        .select('students')
        .eq('join_code', code)
        .single()

    if (error) console.log(error.message)

    const studentsArray = students.concat(user.user_id)

    const classroom = await supabase
        .from('classrooms')
        .update({ students: studentsArray })
        .eq('join_code', code)
        .single()
        .select('id')

    if (classroom.error) console.error(classroom.error.message)

    const classesArray = user.enrolled_classes.concat(classroom.data.id)

    const newUser = await supabase
        .from('users')
        .update({ enrolled_classes: classesArray })
        .eq('user_id', user.user_id)
        .select()

    redirect('/dashboard/classes/' + classroom.data.id)
}

function generateJoinCode() {

    const n = 7

    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

    if (n > max) {
        return generate(max) + generate(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    const seed = ("" + number).substring(add);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let code = []

    for (let i = 0; i < seed.length; i++) {
        const char = alphabet.charAt((i * 1 + seed.charAt(i)) % alphabet.length)

        code.push(char)
    }

    return code.join("")
}

export {
    getClassrooms,
    getClassroom,
    deleteClassroom,
    changeName,
    joinClassroom,
    generateJoinCode,
    createClass,
}