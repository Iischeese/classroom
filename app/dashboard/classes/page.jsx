import Button from "@/components/Button"
import Input from "@/components/Input"
import ClassroomPreview from "@/components/dashboard/ClassroomPreview"
import { getClassrooms } from "./actions"
import { getUserData } from "@/app/(setup)/login/actions"
import { Heading } from "@/components/Typography"
import { Suspense } from "react"
import { JoinClassButton, CreateClassButton } from "@/components/CreateClassButton"

export const metadata = {
    title: "Classes"
}

async function Classes() {

    const userData = await getUserData()

    const classrooms = await getClassrooms()

    return (
        <>
            <main className="flex flex-col p-10 w-full min-h-screen gap-14">
                <div className="flex gap-8 h-min">
                    <Input placeholder="Search for a classroom..." />
                    <Button style="w-min">View</Button>
                    <Button style="w-min">Filter</Button>
                    {
                        userData.type == "teacher" ?
                            <CreateClassButton />
                            :
                            <JoinClassButton />
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

export default Classes