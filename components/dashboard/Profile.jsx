import { getUserData } from "@/app/(setup)/login/actions"
import Image from "next/image"

async function ProfilePic() {

    const user = await getUserData()

    return (
        <div className="w-full aspect-square">
            <div className={`${user.type == "teacher" ? " bg-gradient-to-tr from-purple-500 to-blue-500" : ""} flex items-center justify-center w-full aspect-square rounded-full overflow-clip relative`}>
                <Image alt={`${user.first_name}'s profile picture`} className=" w-[90%] rounded-full aspect-square absolute object-cover" width={100} height={100} src={user.profile_pic} />
            </div>
        </div>
    )
}

export default ProfilePic