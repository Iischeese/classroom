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
    .select()
    
  return (
    <>
      <section className='h-screen w-screen flex flex-col items-start justify-center px-10'>
        <span className='text-5xl'>Hello, 
        {data.map((user, i)=>{
          return(
            < h1 key={i}>
            {user.first_name}
            {" "}
            {user.last_name}
            </h1>
          )
        })}
        </span>
        <h2 className='text-3xl'>Welcome to your classroom</h2>
      </section>
    </>
  )
}