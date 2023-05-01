import React from 'react'
import { SignIn } from '@clerk/nextjs'
import Layout from '@/components/Layout/secondaryLayout'

// TODO: Fix the auth pages!! They aren't redirectly properly
const SignInPage = () => (
	<div className="h-[85vh] w-[100vw] flex justify-center items-center">
		<SignIn path="/auth/sign-in" routing="path" signUpUrl="/auth/sign-up" />
	</div>
)

SignInPage.getLayout = (page: React.ReactChild) => <Layout>{page}</Layout>

export default SignInPage
