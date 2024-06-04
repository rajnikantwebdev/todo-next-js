import { createClient } from "./supabase";

export const getUserSession = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getSession();
  return {
    token: user?.data?.session?.access_token,
    email: user?.data?.session?.user?.email,
  };
};
