import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

// Next.js 16 renamed the `middleware` convention to `proxy`.
// This runs on every matched request to keep the Supabase auth
// session/cookies in sync between the browser and the server.
export function proxy(request: NextRequest) {
  return createClient(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - image assets
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
