import { redirect } from "next/navigation";
import { signOut } from "../login/actions";

export async function logout(){
    await signOut()
}