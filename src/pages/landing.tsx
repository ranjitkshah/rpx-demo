import * as React from 'react'
import styles from '../styles/Landing.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { OAuthStrategy } from '@clerk/nextjs/dist/api'
import { useSignIn, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import Loading from '@/components/general/Loading'

// TODO: Handle Twitter auth after Varun decides what he wants to do

// TODO: Add loading or something here
const LandingPage = () => {
	const router = useRouter()
	const { signIn } = useSignIn()
	const { isSignedIn, isLoaded } = useUser()
	const [isLoading, setIsLoading] = React.useState<boolean>(true)
	const [showToast, setShowToast] = React.useState<boolean>(false)

	console.log({isLoaded, isSignedIn})

	React.useEffect(() => {
		if (isLoaded) {
			if (isSignedIn) {
				router.push('/app/main')
			} else {
				setIsLoading(false)
			}
		}
	}, [isLoaded])

	const handleShowToast = () => {
		setShowToast(true)
		setTimeout(() => {
			setShowToast(false)
		}, 10000)
	}

	const signInWith = (strategy: OAuthStrategy) => {
		try {
			return signIn!.authenticateWithRedirect({
				strategy,
				redirectUrl: '/sso-callback',
				// TODO: Can we do a role-based redirect here?
				redirectUrlComplete: '/app/initial-intake'
			})
		} catch (error) {
			console.log('clerk error', error)
		}
	}

	if (isLoading) return <Loading />

	return (
		<main className={`h-[100vh] w-full`}>
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
					{/* <button
						onClick={handleShowToast}
						className={`btn btn-block normal-case my-2 ${styles.loginButtons} ${styles.twitterButton}`}
					>
						Twitter Login
					</button> */}
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
			<div className="toast toast-center z-999">
				{showToast && (
					<div className="alert alert-info w-[300px]">
						<div>
							<span>Twitter integrations are currently disabled.</span>
						</div>
					</div>
				)}
			</div>
		</main>
	)
}

LandingPage.getLayout = (page: React.ReactChild) => <>{page}</>

export default LandingPage
