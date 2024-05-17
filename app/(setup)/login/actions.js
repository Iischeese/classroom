'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { createServerClient } from '@supabase/ssr'

async function login(formData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

async function signup(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/setup')
}

async function getUser(){
  const supabase = createClient()

  const {data, error} = await supabase.auth.getUser()

  if(error) return

  return data.user
}

async function getUserData(id){
  const supabase = createClient()

  let user

  if(!id) user = await getUser()
  else user = {id: id}

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if(error) return

  return data

}

export {signup, login, getUser, getUserData}