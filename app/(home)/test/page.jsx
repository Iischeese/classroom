import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Heading2 from "@/components/Heading2";
import Input from "@/components/Input";
import Label from "@/components/Label";
import SplitView from "@/components/Splitview";
import Header from "@/components/dashboard/Header";

const { default: SubTitle } = require("@/components/SubTitle");
const { default: Title } = require("@/components/Title");

function TEST() {
    return (
        <main className="flex flex-col items-center gap-20 w-screen">
            <div className="flex flex-col gap-8 w-1/2">
                <Title>Typography</Title>
                <Title>Title</Title>
                <SubTitle>Subtitle</SubTitle>
                <Heading>Heading 1</Heading>
                <Heading2>Heading 2</Heading2>
            </div>
            <div className="flex flex-col gap-8 w-1/2">
                <Title>UI</Title>
                <Label>Label:</Label>
                <Input placeholder="Input" />
                <Input mono placeholder="Input mono" />
                <Button>Button</Button>
                <Button primary>Button Primary</Button>
                <Button mono>Button Mono</Button>
                <Button mono primary>Button Mono Primary</Button>
            </div>
            <div className="flex flex-col gap-8 w-screen">
                <SplitView>
                    <Title>Split View</Title>
                </SplitView>
            </div>
            <div className="flex flex-col gap-8 w-1/2">
               <Header/>
            </div>
        </main>
    )
}

export default TEST