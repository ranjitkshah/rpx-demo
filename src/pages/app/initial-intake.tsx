import Image from 'next/image'
import React from 'react'
import styles from '../../styles/pages/Intake.module.css'
import Modal from '@/components/modal/index'
import FanIntakeModalContents from '@/components/modal/FanIntakeModalContents'
import GamerIntakeModalContents from '@/components/modal/GameIntakeModalContents'
import { useUser } from '@clerk/nextjs'
import { NewUser, UserTypes } from '@/shared/types'
import type { UserResource } from '@clerk/types'
import { useRouter } from 'next/router'
import { useUserData } from '@/components/hooks/useUserData'
import Loading from '@/components/general/Loading'

// TODO: Fix popin here around routing when you're auth'd
const InitialIntakePage = () => {
	const router = useRouter()
	const { user, isLoaded, isSignedIn } = useUser()
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const [modalType, setModalType] = React.useState<UserTypes>(UserTypes.GAMER)
	const [showToast, setShowToast] = React.useState<boolean>(false)
	const [showLoadingSpinner, setShowLoadingSpinner] = React.useState<boolean>(false)
	const [showModalLoadingSpinner, setShowModalLoadingSpinner] = React.useState<boolean>(false)

	// TODO: Fix this
	// React.useEffect(() => {
	// 	setShowModalLoadingSpinner(user ? false : true)
	// 	if (!isLoading) {
	// 		if (foundUser) {
	// 			router.push('/app/main')
	// 		} else if (!foundUser && user) {
	// 			setShowLoadingSpinner(false)
	// 		} else {
	// 			router.push('/')
	// 		}
	// 	}
	// }, [isLoading])

	React.useEffect(() => {
		setShowLoadingSpinner(user ? false : true)
			if (!isLoaded) {
			if (isSignedIn) {
				router.push('/app/main')
			} else if (!isSignedIn && user) {
				setShowLoadingSpinner(false)
			} else {
				router.push('/')
			}
		}
	}, [isLoaded])

	if (showLoadingSpinner) return <Loading />

	// TODO: We should either only extend clerk data or rethink our nullish safety here in the future, but this is safe for now
	const handleIntakeUser = async (intakeType: UserTypes) => {
		setShowModalLoadingSpinner(true)

		const newUser: NewUser = {
			clerkId: user!.id,
			firstName: user!.firstName ?? 'DEFAULT',
			lastName: user!.lastName ?? 'DEFAULT',
			signupMethod: user!.externalAccounts[0]?.provider ?? 'DEFAULT',
			userType: intakeType,
			walletFunds: 10000,
			ownedCoins: [],
			createdAt: user!.createdAt?.toISOString() ?? new Date().toISOString(),
			updatedAt: user!.updatedAt?.toISOString() ?? new Date().toISOString(),
			lastSignInAt: user!.lastSignInAt?.toISOString() ?? new Date().toISOString()
		}

		try {
			const response = await fetch('/api/users/intake', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newUser)
			})

			const result = await response.json()

			if (result.status === 'ERROR') {
				throw new Error(result.data.error)
			} else {
				if (intakeType === UserTypes.FAN) {
					router.push('/app/fan/congrats')
				} else {
					// TODO: Verify we want clerk id and not user id
					router.push(`/app/gamer/${newUser.clerkId}/mint`)
				}
			}
		} catch (error) {
			console.error(error)
			setShowToast(true)

			setTimeout(() => {
				setShowToast(false)
			}, 10000)
		} finally {
			setShowModalLoadingSpinner(false)
		}
	}

	const handleOpenModal = (type: UserTypes) => {
		setModalType(type)
		setIsOpen(true)
	}

	return (
		<main className={`h-[100vh] w-full`}>
			<div className={`${styles.intakeContainer} h-[100%]`}>
				<div className="container mx-auto w-[90vw] max-w-[400px] pt-[18vh]">
					<div>
						<Image
							className="mx-auto max-w-[160px] mb-2"
							src={require('../../resources/images/rpxlogo.png')}
							alt="RPX Gamers"
							priority={true}
						/>
						<h1 className="text-2xl text-white text-center mx-auto">Welcome!</h1>
						<h2 className="text-lg text-white text-center tracking-wider mx-auto mt-1">
							Select which options <br /> applies to you:
						</h2>
					</div>
				</div>
				<div className="flex flex-col mt-[20px] w-[90vh] max-w-[320px] mx-auto">
					<button
						onClick={() => handleOpenModal(UserTypes.GAMER)}
						className={`btn btn-block normal-case my-2 ${styles.intakeButtons} ${styles.gamerButton}`}
					>
						Are you a Gamer?
					</button>
					<button
						onClick={() => handleOpenModal(UserTypes.FAN)}
						className={`btn btn-block normal-case my-2 ${styles.intakeButtons} ${styles.fanButton}`}
					>
						Are you a Fan?
					</button>
				</div>
			</div>
			<Modal
				isOpen={isOpen}
				onClick={() => setShowToast(false)}
				content={
					modalType === UserTypes.FAN ? (
						// @ts-ignore
						<FanIntakeModalContents showLoadingSpinner={showModalLoadingSpinner} handleIntakeUser={handleIntakeUser} />
					) : (
						// @ts-ignore
						<GamerIntakeModalContents showLoadingSpinner={showModalLoadingSpinner} handleIntakeUser={handleIntakeUser} />
					)
				}
				handleClose={() => setIsOpen(false)}
			/>
			<div className="toast toast-center z-999">
				{showToast && (
					<div className="alert alert-error w-[300px]">
						<div>
							<span>
								Error creating account, contact
								<br /> charlie@sparksfullstack.io for help.
							</span>
						</div>
					</div>
				)}
			</div>
		</main>
	)
}

export default InitialIntakePage
