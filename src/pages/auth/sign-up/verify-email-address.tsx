import React from 'react'
import { SignUp } from '@clerk/nextjs'
import Layout from '@/components/Layout/secondaryLayout'

const SignUpPage = () => (
	<div className="h-[85vh] w-[100vw] flex justify-center items-center flex-col">
		<SignUp path="/auth/sign-up" routing="path" signInUrl="/auth/sign-in" redirectUrl="/app/initial-intake" />
	</div>
)

SignUpPage.getLayout = (page: React.ReactChild) => <Layout>{page}</Layout>

export default SignUpPage
