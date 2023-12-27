"use server"
import { createSupabseServerClient } from "@/utils/supabase/server";

export async function readUserSession() {
    const supabase = await createSupabseServerClient()
    return supabase.auth.getSession();
}