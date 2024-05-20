import { getUserData } from "@/app/(setup)/login/actions"
import Image from "next/image"

async function ProfilePic(){

    const user = await getUserData()

    return(
        <div className={`${user.isTeacher? "border-4 border-primary":""} w-full aspect-square rounded-full overflow-clip relative`}>
            <Image className="w-full h-full absolute object-cover p-1 rounded-full" width={500} height={500} src={user.profile_pic}/>
        </div>
    )
}

export default ProfilePic