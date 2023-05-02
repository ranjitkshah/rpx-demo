import '../styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import ErrorBoundary from '../components/ErrorBoundary'
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { useRouter } from 'next/router'

export type NextPageWithLayout<P = Record<string, any>, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const router = useRouter()
	const [audioIsPlaying, setAudioIsPlaying] = React.useState<boolean>()

	const startAudio = async () => {
		if (router.pathname.includes('app')) {
			const themeAudio = new Audio('../../resources/sounds/theme.mp3')
			themeAudio.loop = true
			setAudioIsPlaying(true)
			await themeAudio.play()
			window.removeEventListener('click', startAudio)
		}
	}

	React.useEffect(() => {
		window.addEventListener('click', startAudio)
	}, [])

	const renderWithLayout = Component.getLayout || ((page) => <>{page}</>)

	return (
		<ErrorBoundary>
			<ClerkProvider {...pageProps}>{renderWithLayout(<Component {...pageProps} />)}</ClerkProvider>
		</ErrorBoundary>
	)
}

export default MyApp
