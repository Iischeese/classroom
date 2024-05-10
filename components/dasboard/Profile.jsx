import { data } from "@/utils/supabase/user"

function ProfilePic() {
    return (
        <>
            <div className="relative aspect-square h-full rounded-full overflow-clip">
                <img className="absolute object-cover w-full h-full" src={data.profile_pic} />
            </div>
        </>
    )
}

export default ProfilePic