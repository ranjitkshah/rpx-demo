import React from 'react'
import { SignIn } from '@clerk/nextjs'
import Layout from '@/components/Layout/secondaryLayout'

const SignInPage = () => (
	<div className="h-[85vh] w-[100vw] flex justify-center items-center">
		<SignIn path="/auth/sign-in" routing="path" signUpUrl="/auth/sign-up" redirectUrl="/app/initial-intake" />
	</div>
)

SignInPage.getLayout = (page: React.ReactChild) => <Layout>{page}</Layout>

export default SignInPage
