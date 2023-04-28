import React from 'react'
import Footer from './Footer'
import Header from './Header'

type Props = {
	children: React.ReactNode
}

const Layout = ({ children }: Props) => (
	<>
		<Header />
		{children}
		{/* <Footer /> */}
	</>
)

export default Layout
