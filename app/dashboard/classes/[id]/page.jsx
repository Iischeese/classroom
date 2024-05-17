import Button from "@/components/Button"
import { Title, SubTitle, Text} from "@/components/Typography"
import { getClassroom } from "../actions"
import { getUser, getUserData } from "@/app/(setup)/login/actions"
import Error from "@/components/Error"

export default async function Page({ params }) {

  const classroom = await getClassroom(params.id)

  if(classroom.message) return <Error title={"Error "+ classroom.code} desc={classroom.message}/>

  const signedIn = await getUserData()
  const user = await getUserData(classroom.user_id)

  const isSignedIn = await getUser()

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
                <Button style="absolute right-0 bottom-0 w-min m-3" mono primary link={`/dashboard/classes/${params.id}/edit`}>Edit</Button>
                :
                <></>
            }
          </div>
        </div>
        <Text>{classroom.join_code}</Text>
      </main>
    )
  }

  if (isSignedIn.id == user.user_id) return render()
  for (let i = 0; i < classroom.students.length; i++) {
    if (signedIn.user_id == classroom.students[i]) {
      return render()
    }
  }

  return <Error title="Not Authenticated." desc="You don't have access to this classroom, contact your teacher or School Head."/>

}