"use client";

import Form, { FormInput } from "@/components/dashboard/Form";
import FormButton from "@/components/dashboard/FormButton";
import Navigation from "@/components/dashboard/Navigation";
import SettingsContainer, {
  Content,
} from "@/components/dashboard/SettingsContainer";
import Input from "@/components/Input";
import { useEffect, useOptimistic, useState } from "react";

function Test() {
  useEffect(()=>{
    fetch('https://66a01b93b132e2c136000985.mockapi.io/todos')
  })

  const [todos, setTodos] = useState(initTodos);
  const [opTodos, setOpTodos] = useOptimistic(todos);

  return (
    <>
      <SettingsContainer>
        <Content>
          <Navigation title={"TEST"} />
          <Form>
            <FormInput label="Todo" id="todo" placeholder="Add a Todo"/>
            <FormButton>Add</FormButton>
          </Form>
          <ul className="prose prose-invert">
            {opTodos.map((value, index) => {
              return <li key={index}>{value}</li>;
            })}
          </ul>
        </Content>
      </SettingsContainer>
    </>
  );
}

export default Test;
