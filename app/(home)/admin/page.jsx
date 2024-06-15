import Navigation from "@/components/dashboard/Navigation"
import SettingsContainer, { Content } from "@/components/dashboard/SettingsContainer"

function AdminPanel() {

    return (
        <SettingsContainer>
            <Content>
                <Navigation title={"Admin Panel"} />
            </Content>
        </SettingsContainer>
    )
}

export default AdminPanel