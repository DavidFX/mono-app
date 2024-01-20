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

  console.log(data)

}