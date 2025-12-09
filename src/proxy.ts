import { NextResponse, NextRequest } from "next/server";
import { createClient } from "./utils/supabase/server";

export async function proxy(request: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  const pathname = request.nextUrl.pathname;
  const isLoggedIn = data?.claims;

  if (pathname === "/signin") {
    return NextResponse.next();
  }
  if (!isLoggedIn && pathname !== "/signin") {
    const loginUrl = new URL("/signin", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|images|fonts|icons).*)"],
};
