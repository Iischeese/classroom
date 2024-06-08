import { getUserData } from "@/app/(setup)/login/actions"
import Input from "@/components/Input"
import Link from "next/link"

async function ResponsePreview({ value }) {

    const user = await getUserData(value.student_id)

    return (
        <tr className="even:bg-primary/10 relative overflow-clip">
            <td className="p-3">{user.first_name} {user.last_name}</td>
            <td className="p-3 w-min"><p className="text-ellipsis overflow-hidden max-w-52 whitespace-nowrap">{value.response.TEXT}</p></td>
            <td className="p-3 flex gap-2">
                1 / 1
            </td>
        </tr>
    )
}

export default ResponsePreview