import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false)

	const handleToggle = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen)
	}

	// TODO: Also update once client application form flow is done
	return (
		<header>
			<nav id="topnav" className="mx-auto defaultscroll is-sticky nav-sticky animate-gradualLoad pt-6">
				<Link className="cursor-pointer" href="/">
					<Image
						className="max-w-[200px] mx-auto translate-y-[10px]"
						alt="RPX logo"
						src={require('../../../resources/images/rpxlogo.png')}
					/>
				</Link>
				<Link className="cursor-pointer inline-block ml-6 translate-y-[-35px]" href="/">
					<Image
						className="w-[22px] mx-auto translate-y-[10px]"
						alt="Back button"
						src={require('../../../resources/images/back.png')}
					/>
				</Link>
			</nav>
		</header>
	)
}

export default Header
