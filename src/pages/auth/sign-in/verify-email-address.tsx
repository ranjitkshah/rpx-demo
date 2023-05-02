import { SignIn } from '@clerk/nextjs'
import React from 'react'

const VerifyEmailAddress = () => {
	return (
		<div className="h-[85vh] w-[100vw] flex justify-center items-center">
			<SignIn path="/auth/sign-in" routing="path" signUpUrl="/auth/sign-up" redirectUrl="/app/initial-intake" />
		</div>
	)
}

export default VerifyEmailAddress
