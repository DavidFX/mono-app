import { cookies } from "next/headers";
import { createSupabseServerClient } from "@/utils/supabase/server";

export default async function PostsList() {
  const supabase = createSupabseServerClient();
  // const { data: posts } = await supabase.from("posts").select("*");

  return (
    // <pre className="container px-24 mt-6">{JSON.stringify(posts, null, 2)}</pre>
    <div>Posts List</div>
  );
}
