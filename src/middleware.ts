import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// CS NOTE: This applies for all API routes as well
const publicPaths = ['/', '/auth/sign-in', '/auth/sign-up', '/landing']

const isPublic = (path: string) => {
	return publicPaths.includes(path)
}

export default withClerkMiddleware((request: NextRequest) => {
	// TODO: Ensure this is safe
	if (process.env.NODE_ENV === 'development') {
		return NextResponse.next()
	}

	if (isPublic(request.nextUrl.pathname)) {
		return NextResponse.next()
	}
	// if the user is not signed in redirect them to the sign in page.
	const { userId } = getAuth(request)

	if (!userId) {
		// redirect the users to /pages/sign-in/[[...index]].ts

		const signInUrl = new URL('/auth/sign-in', request.url)
		signInUrl.searchParams.set('redirect_url', request.url)
		return NextResponse.redirect(signInUrl)
	}
	return NextResponse.next()
})

export const config = { matcher: '/((?!_next/image|_next/static|favicon.ico|.*.svg).*)' }
