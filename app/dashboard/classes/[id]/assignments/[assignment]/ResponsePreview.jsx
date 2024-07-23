"use client";

import Input from "@/components/Input";
import { getResponseByID, updateGrade } from "./actions";
import Drawer from "@/components/Drawer";
import { useEffect, useState } from "react";
import Divider from "@/components/Divider";
import TipTap from "@/components/dashboard/TipTap";

function ResponsePreview({ value, user, defGrade }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const res = await getResponseByID(value.id);
      setText(value.response.TEXT);
    };

    fetch();
  }, []);

  return (
    <>
      <tr className="even:bg-primary/10 relative overflow-clip">
        <td className="p-3">
          {user.first_name} {user.last_name}
          <Drawer
            size="lg"
            open={open}
            setOpen={setOpen}
            title={user.first_name + "'s Response"}
          >
            <form>
              <Input
                placeholder={`${defGrade}`}
                style="w-full text-center"
                onChange={async (e) => {
                  await updateGrade(value.id, e.target.value);
                }}
                name="grade"
              />
            </form>
            <Divider />
            {value.response.TEXT ? (
              <TipTap readOnly defaultValue={text} />
            ) : (
              "No Response"
            )}
          </Drawer>
        </td>
        <td
          className="p-3 w-min cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <p className="text-ellipsis w-40 bg-primary/30 rounded-md p-1 px-2 overflow-hidden max-w-52 whitespace-nowrap">
            {value.status}
          </p>
        </td>
        <td className="p-3 flex gap-2 w-24">
          <form>
            <Input
              placeholder={`${defGrade}`}
              style="w-full text-center"
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
