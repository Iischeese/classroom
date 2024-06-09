
import SettingsContainer from "@/components/dashboard/SettingsContainer";
import Navigation from "@/components/dashboard/Navigation";
import Button from "@/components/Button";
import { newGrade } from "@/app/dashboard/classes/[id]/assignments/[assignment]/actions";

async function TEST() {

    return (
        <SettingsContainer>
            <Navigation title={"Test "} />
            <form>
                <Button click={newGrade}>Add grade</Button>
            </form>
        </SettingsContainer>
    )
}

export default TEST