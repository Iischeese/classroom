import { Title, Text, Heading } from "@/components/Typography"
import { getAssignment, getResponse, setResponseViewed } from "../../../actions"
import SettingsContainer from "@/components/dashboard/SettingsContainer"
import { getUserData } from "@/app/(setup)/login/actions"
import Response from "./Response"
import { createResponse, getResponses } from "./actions"
import ResponsePreview from "./ResponsePreview"
import Error from "@/components/Error"

async function AssignmentView({ params }) {

    const id = params.assignment

    const user = await getUserData()

    const assignment = await getAssignment(id)

    if(assignment.message) return <Error />

    if (user.type == "student") {
        const response = await getResponse(id, user.user_id)

        if(response.code == "PGRST116") {
            const response = await createResponse(id, user.user_id)

            if(response.message) {console.log(response); return <Error />}
        }

        await setResponseViewed(response, true)
    }

    const responses = await getResponses(id)

    return (
        <>
            <SettingsContainer>
                <div className="py-10 w-full flex justify-between items-end border-b border-text/40">
                    <Title>{assignment.name}</Title>
                    <Text>Due {assignment.due_date}</Text>
                </div>
                <p className="py-10 text-text/85">
                    {assignment.description}
                </p>
                <div className="border-t border-text/40 py-10 flex flex-col gap-3">
                    {
                        user.type == "student" ?
                            <Response id={id} user={user.user_id} />
                            :
                            <>
                                <Heading>Students Work: </Heading>
                                {
                                    responses.map((value, index) => {
                                        return (
                                            <ResponsePreview key={index} value={value} />
                                        )
                                    })
                                }

                            </>
                    }
                </div>
            </SettingsContainer>
        </>
    )
}

export default AssignmentView