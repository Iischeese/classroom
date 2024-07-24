"use client"

import TipTap from "@/components/dashboard/TipTap";
import { useEffect, useState } from "react";
import { getAssignment } from "./actions";

function Description({assignment}) {

    const [defaultText, setText] = useState(assignment.description)

    useEffect(()=>{
        const update = async () => {
            const res = await getAssignment(assignment.id)
            setText(res.description)
        }

        update()
    }, [])

    return(
        <TipTap noBorder readOnly defaultValue={defaultText} />
    )
}

export default Description;
