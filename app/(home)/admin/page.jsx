import Navigation from "@/components/dashboard/Navigation"
import SettingsContainer from "@/components/dashboard/SettingsContainer"

function AdminPanel(){

    return(
        <SettingsContainer>
            <Navigation title={"Admin Panel"}/>
        </SettingsContainer>
    )
}

export default AdminPanel