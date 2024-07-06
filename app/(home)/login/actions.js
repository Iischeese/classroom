'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

async function getUser() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error) return null

  return data.user
}

async function getUserData(id) {
  const supabase = createClient()

  let user

  if (!id) user = await getUser()
  else user = { id: id }

  if (!user) return { message: "User not found" }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) return error

  return data

}

async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/login')
}

export { getUser, getUserData, signOut }