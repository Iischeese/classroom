'use client'

import { SideBar } from "@/components/dashboard/SettingsContainer"
import { Text } from "@/components/Typography"
import Button from "@/components/Button"
import { deleteAssignment, releaseGrades } from "./actions"

function AssignmentSideBar({ assignment }) {

    const release = async () => {
        await releaseGrades(assignment.id, true)
    }

    const unRelease = async () => {
        await releaseGrades(assignment.id, false)
    }

    return (
        <SideBar>
            <Text>Scores are {assignment.score_released ? "" : "not"} released</Text>
            {
                !assignment.score_released ?
                    <Button primary noForm={release}>Publish Scores</Button>
                    :
                    <Button noForm={unRelease}>Unpublish Scores</Button>

            }

            <Button danger noForm={async()=>{await deleteAssignment(assignment.id)}}>Delete Assignment</Button>

        </SideBar>
    )
}

export default AssignmentSideBar