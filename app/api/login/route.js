import { createClient } from "@/utils/supabaseServer";
import { redirect } from "next/navigation";

export async function POST(request) {
  const supabase = createClient();
  try {
    const { email, password } = await request.json();
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      redirect("/error");
    }

    const access_token = data?.session?.access_token;
    return new Response(JSON.stringify({ message: "Logged in successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.log("error while logging server", error);
  }
}
