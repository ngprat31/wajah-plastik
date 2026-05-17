import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cek jika user mencoba mengakses halaman /upload atau API /api/upload-bulk
  if (pathname.startsWith('/upload') || pathname.startsWith('/api/upload-bulk')) {
    
    // Jika ENVIRONMENT bukan 'development', kunci aksesnya
    if (process.env.NODE_ENV !== 'development') {
      // Rewrite ke halaman 404 bawaan Next.js
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }

  return NextResponse.next();
}

// Daftarkan route yang ingin diawasi oleh middleware ini
export const config = {
  matcher: ['/upload/:path*', '/api/upload-bulk/:path*'],
};