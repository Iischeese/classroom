import Link from "next/link"
import { Text } from "../Typography"
import NotificationDot from '@/components/dashboard/Notification'
import { getResponse } from "@/app/dashboard/classes/[id]/assignments/[assignment]/actions"
import { getUser } from "@/app/(home)/login/actions"

async function AssignmentPreview({ link, assignment }) {

    const user = await getUser()

    const response = await getResponse(assignment.id, user.id)

    return (
        // <Link href={`/dashboard/classes/${link}/assignments/${assignment.id}`}>
            <div className="w-full border-b border-text/40 flex items-center justify-between p-3 h-10">
                <div className="flex gap-2 items-center w-full">
                    <NotificationDot color="blue-500" visible={response.is_viewed}/>
                    <Text>{assignment.name}</Text>
                </div>
                <p className="text-text/75">{assignment.type}</p>
            </div>
        // </Link>
    )
}

export default AssignmentPreview