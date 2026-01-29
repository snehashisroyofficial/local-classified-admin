import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Match all paths except static files, images, api, etc.
  matcher: ["/((?!_next|api|favicon.ico|images|fonts|icons).*)"],
};
