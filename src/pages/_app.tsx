import '../styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import ErrorBoundary from '../components/ErrorBoundary'
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'
import React from 'react'
import { useRouter } from 'next/router'
import RedirectToLanding from './auth/redirect-to-landing'

export type NextPageWithLayout<P = Record<string, any>, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

const publicPages = ['/landing', '/auth/sign-up', '/auth/sign-in']

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// const router = useRouter()
	// const [audioIsPlaying, setAudioIsPlaying] = React.useState<boolean>()

	// const startAudio = async () => {
	// 	if (router.pathname.includes('app')) {
	// 		const themeAudio = new Audio('../../resources/sounds/theme.mp3')
	// 		themeAudio.loop = true
	// 		setAudioIsPlaying(true)
	// 		themeAudio.play()
	// 		window.removeEventListener('click', startAudio)
	// 	}
	// }

	// setTimeout(() => {
	// 	console.log('window', { audioIsPlaying })
	// 	startAudio()
	// }, 5000)

	// React.useEffect(() => {
	// 	window.addEventListener('click', startAudio)
	// }, [])

	const { pathname } = useRouter()

	const isPublicPage = publicPages.includes(pathname)

	const renderWithLayout = Component.getLayout || ((page) => <>{page}</>)

	return (
		<ErrorBoundary>
			<ClerkProvider {...pageProps}>
				{isPublicPage ? (
					renderWithLayout(<Component {...pageProps} />)
				) : (
					<>
						<SignedIn>{renderWithLayout(<Component {...pageProps} />)}</SignedIn>
						<SignedOut>
							<RedirectToLanding />
						</SignedOut>
					</>
				)}
			</ClerkProvider>
		</ErrorBoundary>
	)
}

export default MyApp
