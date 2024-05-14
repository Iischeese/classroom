import Button from "@/components/Button"
import SubTitle from "@/components/SubTitle"
import Title from "@/components/Title"
import { createClient } from "@/utils/supabase/server"
import Image from "next/image"

export default async function Page({ params }) {

  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: { name, grade_level, header_photo, user_id } } = await supabase
    .from('classrooms')
    .select('*')
    .eq('id', params.id)
    .single()

  const { data: { prefix, last_name } } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', user_id)
    .single()

  return (
    <main className="flex flex-col p-10 w-screen min-h-[calc(100vh-5rem)] gap-14">
      <div className="relative rounded-md h-96 overflow-clip">
        <img className="z-10 absolute object-cover w-full h-full" src={header_photo} />
        <div className="z-20 absolute w-full h-full bg-background/50" />
        <div className="absolute w-full h-full top-0 left-0 z-30 flex flex-col gap-2" >
          <Button link={'/dashboard/classes'} style="m-3 w-min absolute top-0 left-0 m-3" mono>Back</Button>
          <div className="flex flex-col gap-2 absolute bottom-0 m-3">
            <Title>{name}</Title>
            <SubTitle>{grade_level}{grade_level > 2 ? "th" : grade_level > 1 ? "nd" : "st"} grade | {prefix} {last_name}</SubTitle>
          </div>
          {
            // Edit Mode
            user_id == user.id ?
              <Button style="absolute right-0 bottom-0 w-min m-3" mono primary link={`/dashboard/classes/${params.id}/edit`}>Edit</Button>
              :
              <></>
          }
        </div>
      </div>
    </main>
  )
}