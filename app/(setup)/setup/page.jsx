import SplitView from "@/components/Splitview"
import SubTitle from "@/components/SubTitle"
import Title from "@/components/Title"
import Button from "@/components/Button"

function Setup(){
    return(
        <>
            <SplitView>
                <Title>Let&apos;s get to know each other.</Title>
                <SubTitle>The setup process may take a couple minuets.</SubTitle>
                <Button link={'/setup/1'}>Continue</Button>
            </SplitView>
        </>
    )
}

export default Setup