import React from 'react'
import { SignUp } from '@clerk/nextjs'
import Layout from '@/components/Layout/authLayout'

const SignUpPage = () => (
	<div className="h-[90vh] w-[100vw] flex justify-center items-center flex-col">
		<SignUp path="/auth/sign-up" routing="hash" signInUrl="/auth/sign-in" redirectUrl="/app/test" />
	</div>
)

SignUpPage.getLayout = (page: React.ReactChild) => <Layout>{page}</Layout>

export default SignUpPage
