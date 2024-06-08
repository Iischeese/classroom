import { getUserData } from "@/app/(setup)/login/actions"

async function ResponsePreview({ value }) {

    const user = await getUserData(value.student_id)

    return (
        <tr className="even:bg-primary/10">
            <td className="p-3">{user.first_name} {user.last_name}</td>
            <td className="p-3">{value.response.TEXT ? value.response.TEXT : "No Response"}</td>
        </tr>
    )
}

export default ResponsePreview