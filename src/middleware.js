import { NextResponse } from 'next/server';
import axios from 'axios';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Chỉ kiểm tra các route bắt đầu bằng /admin
  if (pathname.startsWith('/admin')) {
    let token = request.cookies.get('token')?.value;
    
    if (!token) {
      // Không có token, thử làm mới bằng refresh token
      const refreshToken = request.cookies.get('refreshToken')?.value;
      if (!refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      try {
        const response = await axios.post('http://localhost:8080/api/auth/refresh-token', { refreshToken });
        token = response.data.token; // Lấy token mới
        // Lưu token mới vào cookies
        const responseWithNewToken = NextResponse.next();
        responseWithNewToken.cookies.set('token', token, { path: '/', maxAge: 3600 });
        return responseWithNewToken;
      } catch (refreshError) {
        console.error('Lỗi khi làm mới token:', refreshError);
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    try {
      const response = await axios.get('http://localhost:8080/api/auth/getuserbytoken', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userRole = response.data.role;
      if (userRole !== 'admin') {
         return NextResponse.redirect(new URL('/404', request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Lỗi khi kiểm tra vai trò:', error);
      // Thử làm mới token nếu lỗi là 401
      if (error.response?.status === 401) {
        const refreshToken = request.cookies.get('refreshToken')?.value;
        if (!refreshToken) {
          return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
          const response = await axios.post('http://localhost:8080/api/auth/refresh-token', { refreshToken });
          token = response.data.token;
          const responseWithNewToken = NextResponse.next();
          responseWithNewToken.cookies.set('token', token, { path: '/', maxAge: 3600 });
          return responseWithNewToken;
        } catch (refreshError) {
          console.error('Lỗi khi làm mới token:', refreshError);
          return NextResponse.redirect(new URL('/login', request.url));
        }
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};