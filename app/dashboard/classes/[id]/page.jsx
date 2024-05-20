import Button from "@/components/Button"
import { Title, SubTitle, Heading, Text } from "@/components/Typography"
import { getAssignments, getClassroom } from "../actions"
import { getUser, getUserData } from "@/app/(setup)/login/actions"
import Error from "@/components/Error"
import Card from "@/components/Card"
import Bento from "@/components/dashboard/Bento"
import AssignmentPreview from "@/components/dashboard/AssignmentsPreview"

export async function generateMetadata({ params }) {
  const data = await getClassroom(params.id)

  return {
    title: `${data.grade_level}${data.grade_level > 2 ? "th" : data.grade_level > 1 ? "nd" : "st"} Grade ${data.name}`
  }
}

export default async function Page({ params }) {

  const isSignedIn = await getUser()

  // Get Classroom Data
  const classroom = await getClassroom(params.id)
  if (classroom.message) return <Error title="Classroom not found" desc="The classroom you are looking for could have been moved, or deleted" />

  // Get data of user and Owner 
  const signedIn = await getUserData()
  if (signedIn.message) return <Error error={signedIn} />
  const user = await getUserData(classroom.user_id)

  // Get Assignments
  let assignments = await getAssignments(params.id)

  const render = () => {
    return (
      <main className="flex flex-col p-10 w-screen min-h-[calc(s100vh-5rem)] gap-14">
        <div className="relative rounded-md h-96 overflow-clip">
          <img className="z-10 absolute object-cover w-full h-full" src={classroom.header_photo} />
          <div className="z-20 absolute w-full h-full bg-background/20" />
          <div className="absolute w-full h-full top-0 left-0 z-30 flex flex-col gap-2" >
            <Button link={'/dashboard/classes'} style="m-3 w-min absolute top-0 left-0 m-3" mono>Back</Button>
            <div className="flex flex-col gap-2 absolute bottom-0 m-3">
              <Title>{classroom.name}</Title>
              <SubTitle>{classroom.grade_level}{classroom.grade_level > 2 ? "th" : classroom.grade_level > 1 ? "nd" : "st"} grade | {user.prefix} {user.last_name}</SubTitle>
            </div>
            {
              // Edit Mode
              signedIn.user_id == classroom.user_id ?
                <div className="absolute right-0 top-0 m-3 flex gap-2">
                  <Button mono link={`/dashboard/classes/${params.id}/edit`}>Settings</Button>
                  <Button mono primary link={`/dashboard/classes/${params.id}/assignments/create`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg></Button>
                </div>
                :
                <></>
            }
          </div>
        </div>
        <Bento>
          <Card >
            <div className="flex flex-col gap-2">
              <Heading>Join Code:</Heading>
              <Text>{classroom.join_code}</Text>
            </div>
          </Card>
          <Card className="row-span-3 flex flex-col gap-4">
            <Heading>Upcoming assignments</Heading>
            {
              assignments.map((assignment, index)=>{
                return(
                  <AssignmentPreview link={params.id} assignment={assignment} key={index} />
                )
              })
            }
          </Card>
        </Bento>
      </main >
    )
  }

  // Check Auth
  if (isSignedIn.id == user.user_id) return render()
  for (let i = 0; i < classroom.students.length; i++) {
    if (signedIn.user_id == classroom.students[i]) {
      return render()
    }
  }

  return <Error title="Not Authenticated." desc="You don't have access to this classroom, if this is a mistake contact your teacher or School Head." />

}