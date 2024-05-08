import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const { userData } = await supabase
    .from('users')
    .select()
    .eq('user_id', data.user.id)

    console.log(userData)

  return (
    <>
      <section className='h-screen w-screen flex flex-col items-start justify-center px-10'>
        <h1 className='text-5xl'>Hello, Ian</h1>
      </section>
    </>
  )
}