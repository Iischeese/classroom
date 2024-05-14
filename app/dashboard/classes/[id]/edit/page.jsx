import Button from "@/components/Button"
import Heading from "@/components/Heading"
import Heading2 from "@/components/Heading2"
import Input from "@/components/Input"
import { Section, SectionContent, SectionFooter } from "@/components/Section"
import SubTitle from "@/components/SubTitle"
import Title from "@/components/Title"
import { createClient } from "@/utils/supabase/server"

async function ClassroomSettings({ params }) {

    const id = params.id

    const supabase = createClient()

    const { data: { user_id, name }, error } = await supabase
        .from('classrooms')
        .select('*')
        .eq('id', id)
        .single()

    const { data: { prefix, last_name } } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user_id)
        .single()

    return (
        <>
            <main className="w-full flex flex-col p-5 px-[20vw]">
                <Title>Settings for {name}</Title>
                <SubTitle>Taught by {prefix} {last_name}</SubTitle>
                <p className="text-sm text-text/20">[{id}]</p>

                <div className="flex flex-col gap-10 my-10">
                    <Section>
                        <SectionContent>
                            <Heading>Name</Heading>
                            <Heading2>This is the title of your classroom. For example: English, History, ect. ( currently {name} ).</Heading2>
                            <Input mono placeholder={name} id="name" name="name"/>
                        </SectionContent>
                        <SectionFooter>
                            <p>Ensure length of title is less than 500 characters</p>
                            <Button style='w-min' mono primary>Save</Button>
                        </SectionFooter>
                    </Section>
                </div>
            </main>
        </>
    )
}

export default ClassroomSettings