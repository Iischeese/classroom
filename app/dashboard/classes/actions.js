'use server'

import { getUserData } from "@/app/(setup)/login/actions"
import { createClient } from "@/utils/supabase/server"

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

export default getClassrooms