import * as React from 'react'
import styles from '../styles/Landing.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { OAuthStrategy } from '@clerk/nextjs/dist/api'
import { useSignIn } from '@clerk/nextjs'

// TODO: Build login out following these steps: https://clerk.com/docs/authentication/oauth-custom-flow

// TODO: Do an auth check and default here if the user isn't logged in
const LandingPage = () => {
	const { signIn } = useSignIn()

	const signInWith = (strategy: OAuthStrategy) => {
		try {
			return signIn!.authenticateWithRedirect({
				strategy,
				redirectUrl: '/sso-callback',
				// TODO: Update to redirect to actual page
				redirectUrlComplete: '/'
			})
		} catch (error) {
			console.log('clerk error', error)
		}
	}

	return (
		<div className={`${styles.mainLanding} h-[100vh] w-full`}>
			<div className={`${styles.landingContainer} h-[100%]`}>
				<div className="container mx-auto w-[90vw] max-w-[400px] pt-[23vh]">
					<div>
						<Image className="mx-auto" src={require('../resources/images/rpxlogo.png')} alt="rpxlogo" priority={true} />
						<h1 className="mt-[-20px] text-white text-center tracking-wider ml-[15px]">Gamer Coins & Collectibles</h1>
					</div>
				</div>
				<div className="flex flex-col mt-[100px] w-[90vh] max-w-[320px] mx-auto">
					<button
						onClick={() => signInWith('oauth_twitch')}
						className={`btn btn-block normal-case my-2 ${styles.loginButtons} ${styles.twitchButton}`}
					>
						Twitch Login
					</button>
					<button
						onClick={() => signInWith('oauth_twitter')}
						className={`btn btn-block normal-case my-2 ${styles.loginButtons} ${styles.twitterButton}`}
					>
						Twitter Login
					</button>
					<button
						onClick={() => signInWith('oauth_google')}
						className={`btn btn-block normal-case my-2 ${styles.loginButtons} ${styles.googleButton}`}
					>
						Google Login
					</button>
				</div>
				<div className="mt-[37px] w-[90vh] max-w-[320px] mx-auto">
					<p className={`text-center text-slate-400 ${styles.signupText}`}>
						Don't have an account?{' '}
						<Link href="/auth/sign-up">
							<span className={`text-slate-400 ${styles.signupLink}`}>Sign Up Here</span>
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

LandingPage.getLayout = (page: React.ReactChild) => <>{page}</>

export default LandingPage
