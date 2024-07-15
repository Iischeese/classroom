import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(Request) {

    const supabase = createClient()

    const {data, error} = await supabase.auth.getUser()

    if(!error) redirect('/dashboard/classes')
    else redirect('/home')

    return new Response("This is a new API route");
  }