import ONInput from "@/components/onboarding/ONInput"
import { setupUser } from "./actions"
import ONDropdown from "@/components/onboarding/ONDropdown"
import Button from "@/components/Button"

function Setup1() {

    return (
        <>
            <main>
                <form className="h-screen w-screen flex flex-col items-center justify-center gap-10">
                    <h1 className="text-2xl flex gap-4 items-end">
                        My name is
                        <ONInput id="fname" name="fname" type="text" placeholder="First Name" />
                        <ONInput id="lname" name="lname" type="text" placeholder="Last Name" />.
                    </h1>
                    <h1 className="text-2xl flex gap-4 items-end">
                        And I <ONDropdown id="teach" name="teach" options={['am', 'am not']} />  a
                        teacher.
                    </h1>
                    <Button click={setupUser} style="w-min">Continue</Button>
                </form>
            </main>
        </>
    )
}

export default Setup1