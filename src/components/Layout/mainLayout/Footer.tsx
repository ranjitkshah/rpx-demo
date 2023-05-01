import styles from '../../../styles/layout/mainLayout/Footer.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Navbar = () => {
	const router = useRouter()

	// TODO: Renable the links when the pages are created
	return (
		<footer className="h-[7vh]">
			<div className={styles.footerNav}>
				<div
					className={styles.footerNavItem}
					onClick={() => {
						router.push('/app/main')
					}}
				>
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
				<div
					className={styles.footerNavItem}
					onClick={() => {
						router.push('/app/coins')
					}}
				>
					<div className="translate-y-[1px]">
						<Image alt="Coins Icon" src={require('../../../resources//images/coin.png')} width={40} height={36} />
					</div>
				</div>
				<div
					className={styles.footerNavItem}
					// onClick={() => {
					// 	router.push('/collectibles')
					// }}
				>
					<div className="translate-y-[2.5px]">
						<Image
							alt="Collectibles icon"
							src={require('../../../resources//images/collectibles.png')}
							width={60}
							height={36}
						/>
					</div>
				</div>
				<div
					className={styles.footerNavItem}
					// onClick={() => {
					// 	router.push('/userprofile')
					// }}
				>
					<div className="translate-y-[1px]">
						<Image alt="My stuff icon" src={require('../../../resources//images/mystuff.png')} width={50} height={35} />
					</div>
				</div>
				<div
					className={styles.footerNavItem}
					// onClick={() => {
					// 	router.push('/more')
					// }}
				>
					<div className="translate-y-[1px]">
						<Image alt="More icon" src={require('../../../resources//images/more.png')} width={40} height={36} />
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Navbar