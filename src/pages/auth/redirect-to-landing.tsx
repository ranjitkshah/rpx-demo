import { useRouter } from 'next/router'
import React from 'react'

const RedirectToLanding = () => {
	const router = useRouter()

	React.useEffect(() => {
		router.push('/landing')
	}, [])
	return <></>
}

export default RedirectToLanding
