import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: any) {
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name: string, options: any) {
                    response.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                },
            },
        }
    );

    // 🔑 Recupera sessão
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

    // 🔒 Proteção de rotas privadas
    if (isAdminRoute && !session) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/login";

        return NextResponse.redirect(redirectUrl);
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Middleware vai rodar apenas nessas rotas:
         */
        "/admin/:path*",
    ],
};
