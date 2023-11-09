import { createClient } from "@/utils/supabase/client";
import { cookies } from "next/headers";

export default function Post() {
  const cookieStore = cookies();
  const supabase = createClient();

  return <div></div>;
}
