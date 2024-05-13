import { createClient } from "@/utils/supabase/server"
import Title from "../Title"
import SubTitle from "../SubTitle"
import Link from "next/link"

async function ClassroomPreview({ classroom }) {

    const supabase = createClient()

    const { data, error } = await supabase
        .from('users')
        .select("*")
        .eq('user_id', classroom.user_id)
        .single()

    return (
        <Link href={`/dashboard/classes/${classroom.id}`}>
            <div className="h-52 w-full p-5 border border-text/40 rounded-md">
                <Title>{classroom.name}</Title>
                <SubTitle>{classroom.grade_level}{classroom.grade_level > 2 ? "th" : classroom.grade_level > 1 ? "nd" : "st"} grade | {data.prefix} {data.last_name}</SubTitle>
            </div>
        </Link>
    )
}

export default ClassroomPreview