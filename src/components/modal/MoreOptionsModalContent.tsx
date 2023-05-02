import React from 'react'
import Image from 'next/image'
import Divider from '../general/Divider'
import { useRouter } from 'next/router'
import { useUserData } from '../hooks/useUserData'

const MoreOptionsModalContent = () => {
	const router = useRouter()
	const { foundUser, clerkUser: user, isLoading } = useUserData()
	return (
		<div className="flex flex-col text-center justify-between">
			<div className="flex-grow-1">
				<div className="flex flex-col items-center">
					<Image src={require('../../resources/images/ducoin.png')} width={70} height={70} alt={''} />
					<p className="text-purple-900 text-2xl font-extrabold">Disguised Unicorn</p>
				</div>
				<Divider />
				<div>
					<ul className="flex flex-col items-center text-lg font-medium">
						<li>Profile</li>
						<li>Settings</li>
						<li onClick={() => router.push(`/app/gamer/xa6aPg6VZ8au6jsGn3No/mint`)}>Create a Coin</li>
						<li>Create a Collectible</li>
						<li>Explore RPX</li>
						<li>Help / Contact</li>
					</ul>
				</div>
			</div>
			<div className="mt-auto">
				<Divider />
				<p>Legal</p>
			</div>
		</div>
	)
}

export default MoreOptionsModalContent
