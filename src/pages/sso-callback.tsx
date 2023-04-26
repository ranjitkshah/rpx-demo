import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import * as React from 'react'

// this is jank af but it works. Should open a StackOverflow question about this
const SSOCallback = () => {
	try {
		return <AuthenticateWithRedirectCallback />
	} catch (error) {
		console.log('clerk error', error)
	}
}

export default SSOCallback
