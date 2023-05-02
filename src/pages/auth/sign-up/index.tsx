import { SignUp } from '@clerk/nextjs'
import React from 'react'

const index = () => {
	return <SignUp path="/auth/sign-up" routing="path" signInUrl="/auth/sign-in" redirectUrl="/app/initial-intake" />
}

export default index
