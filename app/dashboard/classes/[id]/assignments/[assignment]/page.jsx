import { Text, Heading } from "@/components/Typography"
import { deleteAssignment, getAssignment, getGrade, getResponse, setResponseViewed } from "./actions"
import SettingsContainer from "@/components/dashboard/SettingsContainer"
import { getUserData } from "@/app/(setup)/login/actions"
import Response from "./Response"
import { getResponses } from "./actions"
import ResponsePreview from "./ResponsePreview"
import Error from "@/components/Error"
import Navigation from "@/components/dashboard/Navigation"
import Table from "@/components/dashboard/Table"
import Button from "@/components/Button"
import { getClassroom } from "../../../actions"

async function AssignmentView({ params }) {

    const id = params.assignment

    const user = await getUserData()

    const assignment = await getAssignment(id)

    const classroom = await getClassroom(assignment.classroom_id)

    if (assignment.message) { console.error(assignment); return <Error /> }

    const check = async () => {
        if (user.type == "student") {
            const response = await getResponse(id, user.user_id)

            await setResponseViewed(response, true)
        }
    }

    await check()

    const responses = await getResponses(id)

    const deleteA = async () => {
        'use server'

        error = await deleteAssignment(assignment.id)
    }

    return (
        <>
            <SettingsContainer>
                <Navigation title={`${assignment.name}`}>
                    <Text>({assignment.type})</Text> <Text><span className="w-full break-keep">{assignment.due_date}</span></Text>
                    {user.user_id == classroom.user_id ?  <form action=""><Button danger click={deleteA}>Delete</Button></form> : <></>}
                </Navigation>
                <p className="pb-5 text-text/85">
                    {assignment.description}
                </p>

                <div className="w-full  flex flex-col gap-4 border-t border-text/40 py-5">
                    {
                        user.type == "student" ?
                            <Response id={id} />
                            :
                            <>
                                <Heading>Students Work: </Heading>
                                <Table headingItems={['Student', 'Response', 'Grade']}>
                                    {
                                        responses.map(async (value, index) => {

                                            const user = await getUserData(value.user_id)

                                            const grade = await getGrade(value.id)

                                            return (
                                                <ResponsePreview defGrade={grade} user={user} key={index} value={value} />
                                            )
                                        })
                                    }
                                </Table>
                            </>
                    }
                </div>

            </SettingsContainer>
        </>
    )
}

export default AssignmentView