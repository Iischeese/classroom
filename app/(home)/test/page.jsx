"use client";

import Navigation from "@/components/dashboard/Navigation";
import TipTap from "../../../components/dashboard/TipTap";

import SettingsContainer, {
  Content,
} from "@/components/dashboard/SettingsContainer";
import { useEffect, useState } from "react";
import {
  getResponseByID,
  updateValue,
} from "@/app/dashboard/classes/[id]/assignments/[assignment]/actions";
function Test() {
  const [item, setItem] = useState({});
  const [defaultValue, setDefaultValue] = useState('')

  useEffect(()=>{

    async function getResponse(){
      const response = await getResponseByID(36)
      setDefaultValue(response.response.TEXT)
    }

    getResponse()

  }, [])

  const update = async () => {
    await updateValue(
      {
        student_id: "bb8275eb-1a7c-4278-8703-9d2cbba3e57d",
        assignment_id: "1f883a8d-4b69-4e1c-bc0c-8419ee90da9d",
      },
      item
    );
  };


  useEffect(()=>{
    // update()
  }, [item])
  

  console.log(defaultValue)

  return (
    <>
      <SettingsContainer>
        <Content>
          <Navigation title={"TipTap Test"} />
          <TipTap defaultValue={defaultValue.toString()} setItem={setItem} />
        </Content>
      </SettingsContainer>
    </>
  );
}

export default Test;
