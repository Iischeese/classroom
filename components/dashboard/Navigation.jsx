"use client";

import { useRouter } from "next/navigation";
import Button from "../Button";
import { SubTitle } from "../Typography";
import Divider from "../Divider";

function Navigation({ title, children, close }) {
  return (
    <>
      <div className="">
        <div className="flex w-full justify-between items-center">
          <SubTitle>{title}</SubTitle>
          <div className="flex items-center gap-2">
            {children}
            {close ? <Button noForm={close}>Close</Button> : <BackButton />}
          </div>
        </div>
        <Divider />
      </div>
    </>
  );
}

function BackButton({ className }) {
  const router = useRouter();

  const back = () => {
    router.back();
  };

  return (
    <Button style={`${className} w-min`} noForm={back}>
      Back
    </Button>
  );
}

export { BackButton };
export default Navigation;
