import { Title, Text, Heading, SubTitle } from "@/components/Typography"
import { getAssignment, getResponse, setResponseViewed } from "./actions"
import SettingsContainer from "@/components/dashboard/SettingsContainer"
import { getUserData } from "@/app/(setup)/login/actions"
import Response from "./Response"
import { getResponses } from "./actions"
import ResponsePreview from "./ResponsePreview"
import Error from "@/components/Error"
import { BackButton } from "@/components/dashboard/Navigation"

async function AssignmentView({ params }) {

    const id = params.assignment

    const user = await getUserData()

    const assignment = await getAssignment(id)


    if (assignment.message) {console.error(assignment);return <Error />}

    const check = async () => {
        if (user.type == "student") {
            const response = await getResponse(id, user.user_id)

            await setResponseViewed(response, true)
        }
    }

    await check()

    const responses = await getResponses(id)

    return (
        <>
            <SettingsContainer>
                <BackButton />
                <div className="py-10 w-full flex justify-between items-end border-b border-text/40">
                    <SubTitle>{assignment.name}</SubTitle>
                    <Text><span className="w-full break-keep">{assignment.due_date}</span></Text>
                </div>
                <p className="py-10 text-text/85">
                    {assignment.description}
                </p>
                <div className="border-t border-text/40 py-10 flex flex-col gap-3">
                    {
                        user.type == "student" ?
                            <Response id={id} />
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