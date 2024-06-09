import SettingsContainer from "@/components/dashboard/SettingsContainer"
import { getAssignments } from "./[assignment]/actions"
import Navigation from "@/components/dashboard/Navigation"
import { getResponses } from "./[assignment]/actions"
import Link from "next/link"
import Table from "@/components/dashboard/Table"
import {CreateAssignmentButton} from "./createAssignmentButton"

export const metadata = {
    title: 'Classroom Settings'
}

async function Assignments({ params }) {

    let assignments = await getAssignments(params.id)

    return (
        <>
            <SettingsContainer>
                <Navigation title={`All assignments`} >
                    <CreateAssignmentButton id={params.id} />
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
                                <AssignmentPreviewBig id={params.id} as={value} key={index} />
                            )
                        })
                    }
                </Table>
            </SettingsContainer>
        </>
    )
}

async function AssignmentPreviewBig({ as, id }) {

    const responses = await getResponses(as.id)

    let count = 0

    for (let i = 0; i < responses.length; i++) {
        if (responses[i].submitted) {
            count++

        }
    }

    return (
        <tr className="even:bg-primary/10 relative overflow-clip">
            <td className="p-3"><Link href={`/dashboard/classes/${id}/assignments/${as.id}`}>{as.name}</Link></td>
            <td className="p-3">{as.due_date}</td>
            <td className="p-3 flex gap-2">
                <p>{count}</p>
                <p>/</p>
                <p>{responses.length}</p>
            </td>
        </tr>
    )
}

export default Assignments