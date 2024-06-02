import { getUserData } from "@/app/(setup)/login/actions"
import Image from "next/image"

async function ProfilePic() {

    const user = await getUserData()

    return (
        <div className="w-full aspect-square">
            <div className={`${user.type == "teacher" ? "border-4 border-primary" : ""} w-full aspect-square rounded-full overflow-clip relative`}>
                <Image alt={`${user.first_name}'s profile picture`} className="w-full h-full absolute object-cover" width={100} height={100} src={user.profile_pic} />
            </div>
        </div>
    )
}

export default ProfilePic