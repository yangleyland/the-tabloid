import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/search/") && /^\/search\//i.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/search/${pathname.slice("/search/".length)}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:first([Ss][Ee][Aa][Rr][Cc][Hh])/:path*",
};
