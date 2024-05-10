import { redirect } from 'next/navigation'

import { user } from '@/utils/supabase/user'

export default async function PrivatePage() {

  if (error || !user) {
    redirect('/login')
  }
  else redirect('/dashboard/classes')

}