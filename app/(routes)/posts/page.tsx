import { createClient } from "@/utils/supabase/client";
import { cookies } from "next/headers";

export default function Page() {
  const cookieStore = cookies();
  const supabase = createClient();

  return <div></div>;
}
