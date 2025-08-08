import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isMove = request.cookies.get('isMove')?.value;

  console.log('Middleware is running', isMove, 'Path:', request.nextUrl.pathname);

  // Redirect if isMove is not true and path matches /trucks-service/orderPlaced
  if (isMove !== "true" && request.nextUrl.pathname === "/trucks-service/orderPlaced") {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/trucks-service/orderPlaced'], // Run middleware only for this route
};
