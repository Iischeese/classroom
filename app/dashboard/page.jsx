import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import TeacherHome from '@/components/dasboard/TeacherHome'

export default async function PrivatePage() {
  const supabase = createClient()


  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }
  else redirect('/dashboard/classes')

}