import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle image requests
  if (request.nextUrl.pathname.includes('/Collection/')) {
    // Rewrite image requests to the public directory
    const url = request.nextUrl.clone()
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and _next
    '/((?!_next/static|_next/image|api).*)',
  ],
} 