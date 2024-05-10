import { createClient } from "@/utils/supabase/server"
import {user} from "@/utils/supabase/user"
import ClassroomPreview from "@/components/dasboard/classes/ClassroomPreivew"
import Button from "@/components/Button"
import Input from "@/components/Input"

async function Classes() {

    const supabase = createClient()

    const {data: classrooms, error}  = await supabase
        .from('classrooms')
        .select()
        .eq('user_id', user.data.user.id)

    return (
        <>
            <section className='h-full w-full flex flex-col items-center gap-10 p-10'>
                <nav className="flex w-full gap-8">
                    <Input placeholder="Search your classrooms..."/>
                    <Button style='max-w-fit'>Sort By</Button>
                    <Button style='max-w-fit'>View</Button>
                    <Button style='max-w-fit'>Create classroom</Button>
                </nav>
                {classrooms.map((classroom, index) => <ClassroomPreview title={classroom.name} key={index} />)}
            </section>
        </>
    )
}

export default Classes