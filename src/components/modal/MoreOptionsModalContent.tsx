import React from 'react'
import Image from 'next/image'
import Divider from '../general/Divider'
import { useRouter } from 'next/router'
import { useUserData } from '../hooks/useUserData'
import { useCoinByCreator } from '@/components/hooks/useCoinByCreator'
import { useClerk } from '@clerk/nextjs'



const MoreOptionsModalContent = () => {
	const router = useRouter()
	const { foundUser, clerkUser: user, isLoading } = useUserData()
	const isCreatorId = true
	const { coin, isLoading: isCoinLoading, error: coinError } = useCoinByCreator(foundUser?.clerkId as string, isCreatorId)
	const { signOut } = useClerk()


	const handleSignOut = async () => {
		try {
		  await signOut();
		  // Optional: Perform any additional actions after sign out
		  router.push("/landing")
		} catch (error) {
		  console.error('Sign out error:', error);
		}
	  };

	console.log('==', { foundUser, user, coin })
	if (!foundUser) {
		return <></>
	}
	return (
		<div className="flex flex-col text-center justify-between text-black">
			<div className="flex-grow-1">
				<div className="flex flex-col items-center">
					<Image src={coin?.imageUrl} width={70} height={70} alt={''} />
					<p className="text-purple-900 text-2xl font-extrabold">{coin?.name}</p>
				</div>
				<Divider />
				<div>
					<ul className="flex flex-col items-center text-lg font-medium">
						<li>Profile</li>
						<li>Settings</li>
						<li>Explore RPX</li>
						<li>Help / Contact</li>
						<li onClick={handleSignOut}>Sign out</li>
					</ul>
				</div>
			</div>
			<div className="mt-auto mx-auto max-w-[90%] fixed bottom-[7%] left-4">
				<Divider />
				<p>Legal</p>
			</div>
		</div>
	)
}

export default MoreOptionsModalContent
