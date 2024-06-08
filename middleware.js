import { getUser } from './app/(setup)/login/actions'
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request) {

  const user = await getUser()

  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return Response.redirect(url)
  }

  return await updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',],
}