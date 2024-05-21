import Link from "next/link"
import { Text } from "../Typography"
import { getResponse } from "@/app/dashboard/classes/actions"
import { getUser } from "@/app/(setup)/login/actions"

async function AssignmentPreview({ link, assignment }) {

    const user = await getUser()

    const response = await getResponse(assignment.id, user.id)

    return (
        <Link href={`/dashboard/classes/${link}/assignments/${assignment.id}`}>
            <div className="w-full border-b border-text/40 flex items-center justify-between p-3 h-10">
                <div className="flex gap-2 items-center w-full">
                    <div className={`${!response.is_viewed ? "" : "bg-transparent"} bg-blue-500 w-2 aspect-square rounded-full`} />
                    <Text>{assignment.name}</Text>
                </div>
                <p className="text-text/75">{assignment.type}</p>
            </div>
        </Link>
    )
}

export default AssignmentPreview