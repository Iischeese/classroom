"use client";

import Input from "@/components/Input";
import { updateGrade } from "./actions";
import Drawer from "@/components/Drawer";
import { useState } from "react";

function ResponsePreview({ value, user, defGrade }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className="even:bg-primary/10 relative overflow-clip">
        <td className="p-3">
          {user.first_name} {user.last_name}
        </td>
        <td
          className="p-3 w-min cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <p className="text-ellipsis w-20 overflow-hidden max-w-52 whitespace-nowrap">
            {value.response.TEXT ? value.response.TEXT : "No Response"}
          </p>
          <Drawer
            size="lg"
            open={open}
            setOpen={setOpen}
            title={user.first_name + "'s Response"}
          >
            {value.response.TEXT ? value.response.TEXT : "No Response"}
          </Drawer>
        </td>
        <td className="p-3 flex gap-2">
          <form>
            <Input
              placeholder={`${defGrade}`}
              style="w-max-min w-[4.3rem] text-center"
              onChange={async (e) => {
                await updateGrade(value.id, e.target.value);
              }}
              name="grade"
            />
          </form>
        </td>
      </tr>
    </>
  );
}

export default ResponsePreview;
