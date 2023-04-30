import * as React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ErrorBoundary from '../components/ErrorBoundary'
import { ClerkProvider } from '@clerk/nextjs'

function MyApp({ Component, pageProps }: AppProps) {
	// @ts-ignore
	const renderWithLayout = Component.getLayout || ((page) => <>{page}</>)

	return (
		<ErrorBoundary>
			<ClerkProvider {...pageProps}>{renderWithLayout(<Component {...pageProps} />)}</ClerkProvider>
		</ErrorBoundary>
	)
}

export default MyApp
