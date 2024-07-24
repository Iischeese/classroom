"use client";

import Input from "@/components/Input";
import { getResponseByID, updateGrade, updateValue } from "./actions";
import Drawer from "@/components/Drawer";
import { useEffect, useState } from "react";
import Divider from "@/components/Divider";
import TipTap from "@/components/dashboard/TipTap";
import { Heading, Text } from "@/components/Typography";
import {
  SidebarOpenIcon,
  SquareArrowOutDownLeft,
  SquareArrowOutUpLeftIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import Button from "@/components/Button";

function ResponsePreview({ value, user, defGrade }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState({});
  const [updated, setUpdate] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const res = await getResponseByID(value.id);
      setText(value.response.TEXT);
    };

    fetch();
  }, []);

  useEffect(() => {
    const update = async () => {
      await updateValue(value, JSON.stringify(updated));
    };

    update();
  }, [updated]);

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
            {value.submitted ? (
              <TipTap readOnly setItem={setUpdate} defaultValue={text} />
            ) : (
              <Text>{user.first_name} has not responded</Text>
            )}
          </Drawer>
        </td>
        <td className="p-3 w-min cursor-pointer">
          <p className="text-ellipsis overflow-hidden max-w-52 whitespace-nowrap">
            {value.status}
          </p>
        </td>
        <td className="p-3">
          <Button
            noForm={() => {
              setOpen(!open);
            }}
            style="w-min"
          >
            <SquareArrowOutUpRightIcon />
          </Button>
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
