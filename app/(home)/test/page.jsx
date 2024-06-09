'use client'

import SettingsContainer from "@/components/dashboard/SettingsContainer";
import Navigation from "@/components/dashboard/Navigation";
import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import { useState } from "react";
import { Text } from "@/components/Typography";

function TEST() {

    const [open, setOpen] = useState(false)

    return(
        <SettingsContainer>
            <Navigation title={"Test " + open}/>
            <Button noForm={()=>{setOpen(!open)}}>Toggle Drawer</Button>
            <Drawer title={"This is a Drawer!"} setOpen={setOpen} open={open}>
                <Text>You can close it with the button or pressing escape!</Text>
            </Drawer>
        </SettingsContainer>
    )
}

export default TEST