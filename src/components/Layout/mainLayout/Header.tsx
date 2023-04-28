import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

// TODO: add filter and plus icons if we have time
// TODO: Wire up other icons (maybe to a coming soon page) if we have extra time
const Header = () => {
	const router = useRouter()

	return (
		<header>
			<nav>
				<div className={`pt-14 flex justify-center w-[100vw] mb-4`}>
					<div className="flex flex-row items-center w-full justify-around">
						<div
							className="ml-2"
							onClick={() => {
								router.push('/app/main')
							}}
						>
							<Image alt="RPX Logo" src={require('../../../resources/images/rpxlogo.png')} width={80} height={25} />
						</div>
						<div className="">
							<input className="px-2 rounded-lg border-0 w-[195px] h-[24px] text-sm" type={'text'} placeholder={'Search'} />
						</div>
						<div className="">
							<Image alt="Notification bell icon" src={require('../../../resources/images/bell.png')} width={25} height={20} />
						</div>
						<div className="mr-2">
							<Image alt="Cart icon" src={require('../../../resources/images/cart.png')} width={25} height={20} />
						</div>
					</div>
				</div>
				<div style={{ width: '100%%', margin: 'auto' }}>
					<Image
						alt="Horizontal line icon"
						src={require('../../../resources/images/horizontalline.png')}
						width={1380}
						height={3}
					/>
				</div>
			</nav>
		</header>
	)
}

export default Header
