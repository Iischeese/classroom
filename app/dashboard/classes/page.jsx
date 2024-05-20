import Button from "@/components/Button"
import Input from "@/components/Input"
import ClassroomPreview from "@/components/dashboard/ClassroomPreview"
import { redirect } from "next/navigation"
import { getClassrooms, joinClassroom } from "./actions"
import { getUser, getUserData } from "@/app/(setup)/login/actions"
import { Heading, SubTitle, Title } from "@/components/Typography"
import { Suspense } from "react"

export const metadata = {
    title: "Classes"
}

async function Classes() {

    const user = await getUser()

    if (!user) {
        redirect('/login')
    }

    const userData = await getUserData()

    const classrooms = await getClassrooms()

    return (
        <>
            <main className="flex flex-col p-10 w-full min-h-screen gap-14">
                <div className="flex gap-8">
                    <Input mono placeholder="Search for a classroom..." />
                    <Button mono style="w-min">View</Button>
                    <Button mono style="w-min">Filter</Button>
                    {
                        userData.isTeacher ?
                            <Button link='/dashboard/classes/create' mono style="w-1/4 min-w-fit" primary>Create new classroom</Button>
                            :
                            <Button link='/dashboard/classes/join' mono style="w-1/3 min-w-fit" primary>Join a classroom</Button>
                    }
                </div>
                <Suspense fallback={
                    ['', '', ''].map((value, index) => {
                        return (
                            <div key={index} className="h-52 w-full p-5 bg-text/20 rounded-md">
                                <div className="w-40 bg-text/30 h-10 rounded-md"></div>
                                <div className="w-80 my-3 bg-text/20 h-10 rounded-md"></div>
                            </div>
                        )
                    })
                }>
                    {
                        classrooms.length <= 0 ?
                            <div className="w-full flex flex-col items-center">
                                <Heading>You have no classrooms</Heading>
                            </div>
                            :
                            classrooms.map((classroom, index) => <ClassroomPreview key={index} classroom={classroom} />)
                    }
                </Suspense>
            </main>
        </>
    )
}

function CreateClassroom() {

    return (
        <>
            <div className={`${display ? "" : "hidden"} right-0 p-5 fixed top-0 z-[5000] h-screen w-[40vw] bg-background border border-transparent border-l-text/20 rounded-l-md`}>
                <div className="flex justify-between items-center">
                    <Title>Create Classroom</Title>
                    <Button style="w-min" mono>Cancel</Button>
                </div>
            </div>
        </>
    )
}

export default Classes