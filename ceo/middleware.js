import { NextResponse } from "next/server";

const PUBLIC_PATHS = new Set(["/login", "/api/auth/login"]);

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const session = request.cookies.get("ceo_session")?.value;
  const expected = process.env.ADMIN_SESSION_TOKEN;

  if (!expected || !session || session !== expected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|.*\\..*).*)"],
};