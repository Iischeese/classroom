import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import {Heading, SubTitle} from "../Typography"
import { getUser, getUserData } from "@/app/(setup)/login/actions"
import { redirect } from "next/dist/server/api-utils"
import Card from "../Card"

async function ClassroomPreview({ classroom }) {

    const user = await getUser()

    if(!user){
        redirect('/login')
    }

    const data = await getUserData(classroom.user_id)

    return (
        <Link href={`/dashboard/classes/${classroom.id}`}>
            <Card className="h-52">
                <SubTitle>{classroom.name}</SubTitle>
                <Heading>{classroom.grade_level}{classroom.grade_level > 2 ? "th" : classroom.grade_level > 1 ? "nd" : "st"} grade | {data.prefix} {data.last_name}</Heading>
            </Card>
        </Link>
    )
}

export default ClassroomPreview