import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: "/login",
    },
})

export const config = {
    matcher: ['/pool/:path*/:path*', '/dashboard', '/api/pool/:path*'],
}
