import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { Text } from "@/components/Typography"
import { getUserData } from "@/app/(setup)/login/actions"

async function ResponsePreview({value}) {

    const user = await getUserData(value.student_id)

    console.log(user)

    return (
        <div className="p-3 rounded-md border border-text/40 flex justify-between">
            <Text>{user.first_name} {user.last_name}</Text>
            <Text>{value.response.TEXT}</Text>
            <div></div>
        </div>
    )
}

export default ResponsePreview