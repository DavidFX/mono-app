"use server"
import { createSupabseServerClient} from "@/utils/supabase/server"

export async function handleLogout() {
    const supabase = await createSupabseServerClient();
    await supabase.auth.signOut();
  }