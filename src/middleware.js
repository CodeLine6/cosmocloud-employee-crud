import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
export { default } from 'next-auth/middleware';

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/employees-dashboard/:path*',
    '/sign-in',
    '/sign-up',
    '/',
    '/verify/:path*'
  ],
}
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {

  const token = await getToken({ req: request })
  const url= request.nextUrl

  if(token && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname === '/'
  )) {
    return NextResponse.redirect(new URL('/employees-dashboard', request.url))
  }
  if(!token && (
    url.pathname.startsWith('/employees-dashboard') ||
    url.pathname === '/'
  )) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}
