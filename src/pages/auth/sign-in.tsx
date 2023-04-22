import React from 'react'
import { SignIn } from '@clerk/nextjs'
// import SecondaryLayout from '@/components/Layout/SecondaryLayout/SecondaryLayout'

const SignInPage = () => (
	// TODO: Revisit these to make more mobile friendly? + Account for layout
	<div className="h-[100vh] w-[100vw] flex justify-center items-center">
		<SignIn path="/auth/sign-in" routing="path" signUpUrl="/auth/sign-up" />
	</div>
)

// SignInPage.getLayout = (page: React.ReactChild) => <SecondaryLayout>{page}</SecondaryLayout>

export default SignInPage
