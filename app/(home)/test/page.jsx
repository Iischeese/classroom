"use client";

import Navigation from "@/components/dashboard/Navigation";
import TipTap from "../../../components/dashboard/TipTap";

import SettingsContainer, {
  Content,
} from "@/components/dashboard/SettingsContainer";
import { useEffect, useState } from "react";
import {
  updateValue,
} from "@/app/dashboard/classes/[id]/assignments/[assignment]/actions";
function Test() {
  const [item, setItem] = useState({});


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
    update()
  }, [item])
  

  return (
    <>
      <SettingsContainer>
        <Content>
          <Navigation title={"TipTap Test"} />
          <TipTap setItem={setItem} />
        </Content>
      </SettingsContainer>
    </>
  );
}

export default Test;
