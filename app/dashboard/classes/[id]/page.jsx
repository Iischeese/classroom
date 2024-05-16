import Button from "@/components/Button"
import { Title, SubTitle } from "@/components/Typography"
import { getClassroom } from "./actions"
import { getUser, getUserData } from "@/app/(setup)/login/actions"
import { redirect } from "next/dist/server/api-utils"

export default async function Page({ params }) {

  const classroom = await getClassroom(params.id)
  const user = await getUserData()

  const isSignedIn = await getUser()

  if(!isSignedIn) redirect('/login')

  return (
    <main className="flex flex-col p-10 w-screen min-h-[calc(s100vh-5rem)] gap-14">
      <div className="relative rounded-md h-96 overflow-clip">
        <img className="z-10 absolute object-cover w-full h-full" src={classroom.header_photo} />
        <div className="z-20 absolute w-full h-full bg-background/50" />
        <div className="absolute w-full h-full top-0 left-0 z-30 flex flex-col gap-2" >
          <Button link={'/dashboard/classes'} style="backdrop-blur-sm backdrop-filter m-3 w-min absolute top-0 left-0 m-3" mono>Back</Button>
          <div className="flex flex-col gap-2 absolute bottom-0 m-3">
            <Title>{classroom.name}</Title>
            <SubTitle>{classroom.grade_level}{classroom.grade_level > 2 ? "th" : classroom.grade_level > 1 ? "nd" : "st"} grade | {user.prefix} {user.last_name}</SubTitle>
          </div>
          {
            // Edit Mode
            user.user_id == classroom.user_id ?
              <Button style="absolute right-0 bottom-0 w-min m-3" mono primary link={`/dashboard/classes/${params.id}/edit`}>Edit</Button>
              :
              <></>
          }
        </div>
      </div>
    </main>
  )
}