import Button from "@/components/Button"
import SettingsContainer from "@/components/dashboard/SettingsContainer"
import { getAssignments } from "./[assignment]/actions"
import Navigation from "@/components/dashboard/Navigation"
import { getResponses } from "./[assignment]/actions"
import Link from "next/link"

export const metadata = {
    title: 'Classroom Settings'
}

async function Assignments({ params }) {

    let assignments = await getAssignments(params.id)

    return (
        <>
            <SettingsContainer>
                <Navigation title={`All assignments`} >
                    <Button mono primary link={`/dashboard/classes/${params.id}/assignments/create`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                        Assignment
                    </Button>
                </Navigation>
                <table className="text-left border-separate border-spacing-0 border border-text/40 rounded-md">
                    <thead className="bg-primary/10">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Due Date</th>
                            <th className="p-3">Students Completed</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assignments.map((value, index) => {
                                return (
                                    <AssignmentPreviewBig as={value} key={index} />
                                )
                            })
                        }
                    </tbody>
                </table>
            </SettingsContainer>
        </>
    )
}

async function AssignmentPreviewBig({ as }) {

    const responses = await getResponses(as.id)

    let count = 0

    for (let i = 0; i > responses.length; i++) {
        if (responses[i].submitted) {
            count++
        }
    }

    return (
        <tr className="even:bg-primary/10">
            <td className="p-3"><Link href={`/dashboard/classes/${as.classroom_id}/assignments/${as.id}`}>{as.name}  </Link></td>
            <td className="p-3">{as.due_date}</td>
            <td className="p-3">{count}</td>
            <td className="p-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg></td>
        </tr>
    )
}

export default Assignments