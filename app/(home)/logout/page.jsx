import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function Logout() {
  const logout = async () => {
    "use server";

    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    revalidatePath('/', 'layout')
    redirect("/login");
  };

  await logout();

  return <></>;
}

export default Logout;
