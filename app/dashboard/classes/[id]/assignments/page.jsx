import Button from "@/components/Button"
import SettingsContainer from "@/components/dashboard/SettingsContainer"
import { getAssignments, getClassroom } from "../../actions"
import Navigation from "@/components/dashboard/Navigation"
import { getResponses } from "./[assignment]/actions"

async function Assignments({ params }) {

    const classroom = await getClassroom(params.id)

    const assignments = await getAssignments(params.id)

    return (
        <>
            <SettingsContainer>
                <Navigation title={`All assignments for ${classroom.name}`} >
                    <Button mono primary link={`/dashboard/classes/${params.id}/assignments/create`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                        Assignment
                    </Button>
                </Navigation>
                <table class=" table-auto">
                    <thead>
                        <tr>
                            <th>Song</th>
                            <th>Artist</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td>Malcolm Lockyer</td>
                            <td>1961</td>
                        </tr>
                        <tr>
                            <td>Witchy Woman</td>
                            <td>The Eagles</td>
                            <td>1972</td>
                        </tr>
                        <tr>
                            <td>Shining Star</td>
                            <td>Earth, Wind, and Fire</td>
                            <td>1975</td>
                        </tr>
                    </tbody>
                </table>
            </SettingsContainer>
        </>
    )
}

// async function AssignmentPreviewBig({ as }) {

//     const responses = await getResponses(as.id)

//     let count = 0

//     for (let i = 0; i > responses.length; i++) {
//         if (responses[i].submitted) {
//             count++
//         }
//     }

//     return (
//         <tr className="flex justify-between first first:border-0 border-t border-text/40 p-5">
//             <td><p>{as.name}</p></td>
//             <td><p>{as.due_date}</p></td>
//             <td><p>{count}</p></td>
//             <td><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg></td>
//         </tr>
//     )
// }

export default Assignments