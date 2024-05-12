import Button from "@/components/Button"
import Input from "@/components/Input"
import ClassroomPreview from "@/components/dashboard/ClassroomPreview"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/dist/server/api-utils"

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
                    <Button mono style="w-1/3" primary>Create new classroom</Button>
                </div>
                {classrooms.map((classroom, index) =>
                    <ClassroomPreview key={index} classroom={classroom} />
                )}
            </main>
        </>
    )
}

export default Classes