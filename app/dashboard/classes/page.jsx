import Button from "@/components/Button"
import Input from "@/components/Input"
import ClassroomPreview from "@/components/dashboard/ClassroomPreview"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Title from "@/components/Title"

async function Classes() {

    const supabase = createClient()

    const { data: { user }, e } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    let { data: classrooms, error } = await supabase
        .from('classrooms')
        .select('*')


    return (
        <>
            <main className="flex flex-col p-10 w-screen min-h-[calc(100vh-5rem)] gap-14">
                <div className="flex gap-8">
                    <Input mono placeholder="Search for a classroom..." />
                    <Button mono style="w-min">View</Button>
                    <Button mono style="w-min">Filter</Button>
                    <Button link='/dashboard/classes/create' mono style="w-1/4 min-w-fit" primary>Create new classroom</Button>
                </div>
                {classrooms.map((classroom, index) =>
                    <ClassroomPreview key={index} classroom={classroom} />
                )}
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