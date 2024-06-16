import Link from "next/link"
import Image from "next/image"
import { Heading, SubTitle, Text } from "../Typography"
import { getUser, getUserData } from "@/app/(setup)/login/actions"
import Card from "../Card"
import GradeView from "./GradeView"

async function ClassroomPreview({ classroom }) {

    const data = await getUserData(classroom.user_id)

    const user = await getUserData()

    return (
        <Link href={`/dashboard/classes/${classroom.id}`}>
            <Card className="h-52 relative p-0">
                <div className="top-0 right-0 absolute opacity-80 -z-10 w-full h-full ">
                    <Image width={1920} height={1080} className=" absolute w-full h-full object-cover" src={classroom.header_photo} />
                </div>
                <div className="absolute left-0 top-0 m-5">
                    <SubTitle>{classroom.name}</SubTitle>
                    <Heading>{classroom.grade_level}{classroom.grade_level > 2 ? "th" : classroom.grade_level > 1 ? "nd" : "st"} grade | {data.prefix} {data.last_name}</Heading>
                </div>
                {
                    user.type == 'student' ?
                        <GradeView classroom={classroom.id} user={user} />
                        :
                        <></>
                }
            </Card>
        </Link>
    )
}

export default ClassroomPreview