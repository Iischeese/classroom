import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = createClient()

  const verify = async () => {
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
      redirect('/login')
    }
  }

  verify()

  const { data, error } = await supabase
    .from('users')
    .select('first_name')
    
  return (
    <>
      <section className='h-screen w-screen flex flex-col items-start justify-center px-10'>
        <h1 className='text-5xl'>Hello, {data.map((user,i) => {user.first_name})}</h1>
      </section>
    </>
  )
}