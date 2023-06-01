import Modal from '@/components/modal'
import styles from '../../../styles/layout/mainLayout/HeaderAndFooter.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import MoreOptionsModalContent from '@/components/modal/MoreOptionsModalContent'
import { useUserData } from '@/components/hooks/useUserData'

const Navbar = () => {
	const router = useRouter()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [isCollectibleModalOpen, setIsCollectibleModalOpen] = useState<boolean>(false)
	const { foundUser } = useUserData()

	const onRoute = (routeLink: string) => {
		const audio = new Audio('/resources/sounds/swoosh.mpeg')
		audio.play()
		router.push(routeLink)
	}

	// TODO: Renable the links when the pages are created
	return (
		<>
			<Modal isOpen={isModalOpen} content={<MoreOptionsModalContent />} handleClose={() => setIsModalOpen(false)} />
			<Modal
				isOpen={isCollectibleModalOpen}
				content={
					<div className="flex flex-col text-center justify-between text-black mt-40">
						This feature is still in development, stay tuned!
					</div>
				}
				handleClose={() => setIsCollectibleModalOpen(false)}
			/>
			<footer className={styles.footer}>
				<div className={styles.footerNav}>
					<div className={styles.footerNavItem} onClick={() => onRoute('/app/main')}>
						<div>
							<Image
								alt="Home Icon"
								src={require('../../../resources//images/home.png')}
								style={{ opacity: 0.85 }}
								width={30}
								height={34}
							/>
						</div>
					</div>
					<div className={styles.footerNavItem} onClick={() => onRoute('/app/coins')}>
						<div className="translate-y-[1px]">
							<Image alt="Coins Icon" src={require('../../../resources//images/coin.png')} width={40} height={36} />
						</div>
					</div>
					<div
						className={styles.footerNavItem}
						// onClick={() => onRoute('/app/collectibles')}
						// onClick={() => {
						// 	router.push('/collectibles')
						// }}

						onClick={() => {
							const audio = new Audio('/resources/sounds/swoosh.mpeg')
							audio.play()
							setIsCollectibleModalOpen(true)
						}}
					>
						<div className="translate-y-[2.5px]">
							<Image
								alt="Collectibles icon"
								src={require('../../../resources//images/collectibles.png')}
								width={60}
								height={36}
							/>
							<div
								style={{
									position: 'absolute',
									top: '-19px',
									right: '-5px',
									backgroundColor: 'white',
									padding: '5px',
									opacity: '0.7',
									borderRadius: '5px',
									maxHeight: '20px',
									color: 'black',
									fontSize: '8px',
									minWidth: '64px'
								}}
							>
								Coming Soon
							</div>
						</div>
					</div>
					<div className={styles.footerNavItem} onClick={() => onRoute(`/app/user/${foundUser?.id}/my-stuff`)}>
						<div className="translate-y-[1px]">
							<Image alt="My stuff icon" src={require('../../../resources//images/mystuff.png')} width={50} height={35} />
						</div>
					</div>
					<div
						className={styles.footerNavItem}
						onClick={() => {
							const audio = new Audio('/resources/sounds/swoosh.mpeg')
							audio.play()
							setIsModalOpen(true)
						}}
					>
						<div className="translate-y-[1px]">
							<Image alt="More icon" src={require('../../../resources//images/more.png')} width={40} height={36} />
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Navbar
