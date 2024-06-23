"use server"

import { createSupabseServerClient } from "@/utils/supabase/server"

export async function addToBookmars(postId: string, userId: string) {
  const supabase = await createSupabseServerClient()
  const {data, error} = await supabase.from("bookmars").insert({
    post: postId,
    user: userId
  })

  if (error) {
    throw error
  }
}

export async function deletePost (postId: string) {
  const supabase = await createSupabseServerClient()
  const {error} = await supabase.from("posts").delete().eq("id", postId)

  if (error) {
    throw error
  }
}