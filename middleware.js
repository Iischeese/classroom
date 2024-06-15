import Error from 'next/error'
import { getUser } from './app/(setup)/login/actions'
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request) {

  const user = await getUser()

  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return Response.redirect(url)
  }

  if (user) {
    if (user.id !== '5f8b3f57-9dc7-4e4f-bddd-1370817e86ee' && request.nextUrl.pathname.startsWith('/admin')) {
      return Response.error()
    }
  }

  return await updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',],
}