import React from 'react'

const Header = () => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false)

	const handleToggle = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen)
	}

	// TODO: Also update once client application form flow is done
	return (
		<header>
			<nav id="topnav" className="mx-auto defaultscroll is-sticky nav-sticky animate-gradualLoad">
				<p>Header stuff goes here</p>
			</nav>
		</header>
	)
}

export default Header
