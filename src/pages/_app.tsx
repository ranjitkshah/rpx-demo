import '../styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import ErrorBoundary from '../components/ErrorBoundary'
import { ClerkProvider } from '@clerk/nextjs'
import '../../public/registerServiceWorker'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const renderWithLayout = Component.getLayout || ((page) => <>{page}</>)

	return (
		<ErrorBoundary>
			<ClerkProvider {...pageProps}>{renderWithLayout(<Component {...pageProps} />)}</ClerkProvider>
		</ErrorBoundary>
	)
}

export default MyApp
