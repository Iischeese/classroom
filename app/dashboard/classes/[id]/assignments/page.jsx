import SettingsContainer, {
  Content,
} from "@/components/dashboard/SettingsContainer";
import { getAssignments, getResponse } from "./[assignment]/actions";
import Navigation from "@/components/dashboard/Navigation";
import { getResponses } from "./[assignment]/actions";
import Link from "next/link";
import Table from "@/components/dashboard/Table";
import { CreateAssignmentButton } from "./createAssignmentButton";
import { getUserData } from "@/app/(home)/login/actions";
import { getClassroom } from "../../actions";

export const metadata = {
  title: "Classroom Settings",
};

async function Assignments({ params }) {
  const assignments = await getAssignments(params.id);

  const userData = await getUserData();

  const classroom = await getClassroom(params.id);

  const isOwner = userData.user_id == classroom.user_id;

  return (
    <>
      <SettingsContainer>
        <Content>
          <Navigation title={`All assignments`}>
            {isOwner ? <CreateAssignmentButton id={params.id} /> : <></>}
          </Navigation>
          {isOwner ? (
            <Table headingItems={["Name", "Due Date", "Students Completed"]}>
              {assignments.map((value, index) => {
                return (
                  <AssignmentPreviewBig
                    id={params.id}
                    as={value}
                    key={index}
                    owner={isOwner}
                  />
                );
              })}
            </Table>
          ) : (
            <Table headingItems={["Name", "Due Date", "Grade"]}>
              {assignments.map((value, index) => {
                return (
                  <AssignmentPreviewBig
                    owner={isOwner}
                    id={params.id}
                    as={value}
                    key={index}
                  />
                );
              })}
            </Table>
          )}
        </Content>
      </SettingsContainer>
    </>
  );
}

async function AssignmentPreviewBig({ as, id, owner }) {
  const responses = await getResponses(as.id);

  let count = 0;

  for (let i = 0; i < responses.length; i++) {
    if (responses[i].submitted) {
      count++;
    }
  }

  let grade

  if(!owner) { 

    const user = await getUserData()

    const res = await getResponse(as.id, user.user_id)

    grade = res.score
  }

  return (
    <tr className="even:bg-primary/5 relative overflow-clip">
      <td className="p-3">
        <Link href={`/dashboard/classes/${id}/assignments/${as.id}`}>
          {as.name}
        </Link>
      </td>
      <td className="p-3">{as.due_date}</td>
      {owner ? (
        <td className="p-3 flex gap-2">
          <p>{count}</p>
          <p>/</p>
          <p>{responses.length}</p>
        </td>
      ) : (
        <td className="p-3">{grade}</td>
      )}
    </tr>
  );
}

export default Assignments;
