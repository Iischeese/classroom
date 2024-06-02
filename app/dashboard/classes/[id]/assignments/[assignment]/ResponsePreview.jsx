import { Text } from "@/components/Typography"
import { getUserData } from "@/app/(setup)/login/actions"

async function ResponsePreview({ value }) {

    const user = await getUserData(value.student_id)

    return (
        <div className="p-3 rounded-md border border-text/40 flex justify-between">
            <Text>{user.first_name} {user.last_name}</Text>
            <Text>{value.submitted ? value.response.TEXT : "Not yet submitted"}</Text>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
        </div>
    )
}

export default ResponsePreview