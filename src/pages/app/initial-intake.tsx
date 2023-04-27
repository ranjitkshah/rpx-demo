import Image from 'next/image'
import React from 'react'
import styles from '../../styles/pages/Intake.module.css'
import Modal from '@/components/modal'
import SampleModalContent from '@/components/modal/SampleModalContent'
import FanIntakeModalContents from '@/components/modal/FanIntakeModalContents'
import { UserTypes } from '@/shared/types'
import GamerIntakeModalContents from '@/components/modal/GameIntakeModalContents'

// TODO: replace background here
const InitialIntakePage = () => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const [modalType, setModalType] = React.useState<UserTypes>(UserTypes.GAMER)

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
				content={modalType === UserTypes.FAN ? <FanIntakeModalContents /> : <GamerIntakeModalContents />}
				handleClose={() => setIsOpen(false)}
			/>
		</main>
	)
}

export default InitialIntakePage
