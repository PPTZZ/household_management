import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {decrypt} from "@/lib/services/session";

const protectedRoutes = ['/dashboard', '/dashboard/[househpldId]'];
const publicRoutes = ['/login', '/register', '/'];

export const proxy = async (req: NextRequest) => {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = (await cookies()).get('session')?.value;

    let session = null;
    if (cookie) {
        session = await decrypt(cookie);
    }

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    if (
        isPublicRoute &&
        session?.userId &&
        !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    return NextResponse.next();
}

const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
export default config