import { redirect } from "next/navigation";

export async function GET(Request) {
  redirect("/dashboard/classes");
}
