
import { getAverageGrade } from "@/app/dashboard/classes/[id]/assignments/[assignment]/actions"
import { Text, Heading } from "../Typography"

async function GradeView({ classroom, user }) {

    const average = await getAverageGrade(classroom, user.user_id)



    return (
        <>
            <div className="bg-secondary backdrop-blur-sm backdrop-filter flex items-center justify-center aspect-square w-14 rounded-full top-0 right-0 m-5 absolute">
                <Heading>{average}</Heading>
            </div>
        </>
    )
}

export default GradeView