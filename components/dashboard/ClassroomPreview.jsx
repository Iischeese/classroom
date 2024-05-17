import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import {Heading, SubTitle} from "../Typography"
import { getUser, getUserData } from "@/app/(setup)/login/actions"
import { redirect } from "next/dist/server/api-utils"

async function ClassroomPreview({ classroom }) {

    const user = await getUser()

    if(!user){
        redirect('/login')
    }

    const data = await getUserData(classroom.user_id)

    return (
        <Link href={`/dashboard/classes/${classroom.id}`}>
            <div className="h-52 w-full p-5 border border-text/40 rounded-md">
                <SubTitle>{classroom.name}</SubTitle>
                <Heading>{classroom.grade_level}{classroom.grade_level > 2 ? "th" : classroom.grade_level > 1 ? "nd" : "st"} grade | {data.prefix} {data.last_name}</Heading>
            </div>
        </Link>
    )
}

export default ClassroomPreview