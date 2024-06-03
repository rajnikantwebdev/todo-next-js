import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabaseServer";
export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <p className="text-white">Hello {data.user.email}</p>;
}
