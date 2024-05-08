import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const { data: users, e } = await supabase
    .from('users')
    .select('first_name')
    
  return (
    <>
      <section className='h-screen w-screen flex flex-col items-start justify-center px-10'>
        <h1 className='text-5xl'>Hello, {users.toString()}</h1>
      </section>
    </>
  )
}