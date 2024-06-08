import { getUserData } from "@/app/(setup)/login/actions"
import Input from "@/components/Input"
import Link from "next/link"

async function ResponsePreview({ value }) {

    const user = await getUserData(value.student_id)

    return (
        <tr className="even:bg-primary/10 w-full">
            <td className="p-3 whitespace-nowrap w-3/8">{user.first_name} {user.last_name}</td>
            <td className="p-3 truncate w-1/2 text-ellipse">{value.response.TEXT ? value.response.TEXT : "No Response"}</td>
            <td className="p-3 min-w-32 w-1/8"><Input style={'w-min'} placeholder={'90'}/></td>
        </tr>
    )
}

export default ResponsePreview