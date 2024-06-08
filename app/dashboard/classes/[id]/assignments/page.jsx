import Button from "@/components/Button"
import SettingsContainer from "@/components/dashboard/SettingsContainer"
import { getAssignments } from "./[assignment]/actions"
import Navigation from "@/components/dashboard/Navigation"
import { getResponses } from "./[assignment]/actions"
import Link from "next/link"
import Table from "@/components/dashboard/Table"

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
                <Table
                headingItems={[
                    'Name',
                    'Due Date',
                    'Students Completed'
                ]}>
                    {
                        assignments.map((value, index) => {
                            return (
                                <AssignmentPreviewBig as={value} key={index} />
                            )
                        })
                    }
                </Table>
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
        </tr>
    )
}

export default Assignments