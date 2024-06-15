'use client'

import Input from "@/components/Input"
import { updateGrade } from "./actions"


function ResponsePreview({ value, user, defGrade }) {

    return (
        <tr className="even:bg-primary/10 relative overflow-clip">
            <td className="p-3">{user.first_name} {user.last_name}</td>
            <td className="p-3 w-min"><p className="text-ellipsis w-20 overflow-hidden max-w-52 whitespace-nowrap">{value.response.TEXT ? value.response.TEXT : "No Response"}</p></td>
            <td className="p-3 flex gap-2">
                <form>
                    <Input placeholder={`${defGrade}`} style='w-min w-[4.4rem] text-center' onChange={async (e) => {
                        await updateGrade(value.id, e.target.value)
                    }} name="grade" />
                </form>
            </td>
        </tr>
    )
}

export default ResponsePreview