import React from 'react'
import Footer from './Footer'
import Header, { HeaderProps } from './Header'

type Props = {
	children: React.ReactNode
} & HeaderProps

const Layout = ({ children, logo, title }: Props) => (
	<>
		<Header logo={logo} title={title} />
		{children}
		{/* <Footer /> */}
	</>
)

export default Layout
