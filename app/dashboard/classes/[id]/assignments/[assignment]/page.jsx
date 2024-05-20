import { Title, Text } from "@/components/Typography"
import { getAssignment } from "../../../actions"
import SettingsContainer from "@/components/dashboard/SettingsContainer"

async function AssignmentView({ params }) {

    const id = params.assignment

    const assignment = await getAssignment(id)

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
            </SettingsContainer>
        </>
    )
}

export default AssignmentView