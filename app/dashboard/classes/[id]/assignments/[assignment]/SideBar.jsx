import { SideBar } from "@/components/dashboard/SettingsContainer";
import { Text } from "@/components/Typography";
import { deleteAssignment, releaseGrades } from "./actions";
import Form from "@/components/dashboard/Form";
import FormButton from "@/components/dashboard/FormButton";

function AssignmentSideBar({ assignment }) {
  const release = async () => {
    "use server";
    await releaseGrades(assignment.id, true);
  };

  const unRelease = async () => {
    "use server";
    await releaseGrades(assignment.id, false);
  };

  return (
    <SideBar>
      <Text>Scores are {assignment.score_released ? "" : "not"} released</Text>
      {!assignment.score_released ? (
        <Form>
          <FormButton pendingText="Publishing" primary formAction={release}>
            Publish Scores
          </FormButton>
        </Form>
      ) : (
        <Form>
          <FormButton pendingText="Taking Down" formAction={unRelease}>
            Unpublish Scores
          </FormButton>
        </Form>
      )}

      <Form>
        <FormButton
          pendingText="Deleting"
          danger
          formAction={async () => {
            "use server"
            await deleteAssignment(assignment.id);
          }}
        >
          Delete Assignment
        </FormButton>
      </Form>
    </SideBar>
  );
}

export default AssignmentSideBar;
