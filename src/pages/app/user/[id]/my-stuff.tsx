import React from 'react'
import Layout from '@/components/Layout/mainLayout'
import styles from '../../../../styles/pages/MyStuff.module.css'
import { useRouter } from 'next/router'
import { RPXUser, Coin } from '@/shared/types'
import Loading from '@/components/general/Loading'
import MyStuff from '@/components/sections/MyStuff'
import MyCoins from '@/components/sections/MyCoins'
import Cr1msonAvenger from '../../../../resources/images/coins/Cr1msonAvenger.png'
import Cr1msonAvengerText from '../../../../resources/images/coins/Cr1msonAvengerText.png'
import D3athBlow from '../../../../resources/images/coins/D3athBlow.png'
import D3athBlowText from '../../../../resources/images/coins/D3athBlowText.png'
import DarkNightm4re from '../../../../resources/images/coins/DarkNightm4re.png'
import DarkKnightm4reText from '../../../../resources/images/coins/DarkKnightm4reText.png'
import FuryFight3r from '../../../../resources/images/coins/FuryFight3r.png'
import FuryFight3rText from '../../../../resources/images/coins/FuryFight3rText.png'
import Infern0Assassin from '../../../../resources/images/coins/Infern0Assassin.png'
import Infern0AssassinText from '../../../../resources/images/coins/Infern0AssassinText.png'
import NightHunter from '../../../../resources/images/coins/NightHunter.png'
import NightHunterText from '../../../../resources/images/coins/NightHunterText.png'
import R0gueRider from '../../../../resources/images/coins/R0gueRider.png'
import R0gueRiderText from '../../../../resources/images/coins/R0gueRiderText.png'
import StealthSniper from '../../../../resources/images/coins/StealthSniper.png'
import StealthSniperText from '../../../../resources/images/coins/StealthSniperText.png'
import ThunderB0ltz from '../../../../resources/images/coins/ThunderB0ltz.png'
import ThunderB0ltzText from '../../../../resources/images/coins/ThunderB0ltzText.png'
import TitanWarrior188 from '../../../../resources/images/coins/TitanWarrior188.png'
import TitanWarrior188Text from '../../../../resources/images/coins/TitanWarrior188Text.png'
import ExploreMore from '@/components/sections/ExploreMore'
import { useAllCoins } from '@/components/hooks/useAllCoins'
import { splitArrayIntoThree } from '@/shared/utils'
import { useUser } from '@clerk/nextjs'
import { useUserData } from '@/components/hooks/useUserData'

const coinsImageMap = {
	Cr1msonAvenger,
	D3athBlow,
	DarkNightm4re,
	FuryFight3r,
	Infern0Assassin,
	NightHunter,
	R0gueRider,
	StealthSniper,
	ThunderB0ltz,
	TitanWarrior188
}

const coinsImageNameMap = {
	Cr1msonAvenger: Cr1msonAvengerText,
	D3athBlow: D3athBlowText,
	DarkNightm4re: DarkKnightm4reText,
	FuryFight3r: FuryFight3rText,
	Infern0Assassin: Infern0AssassinText,
	NightHunter: NightHunterText,
	R0gueRider: R0gueRiderText,
	StealthSniper: StealthSniperText,
	ThunderB0ltz: ThunderB0ltzText,
	TitanWarrior188: TitanWarrior188Text
}

const MyStuffPage = () => {
	const router = useRouter()
	const { id } = router.query
	const [user, setUser] = React.useState<RPXUser | null>()
	const [coins, setCoins] = React.useState<Coin[] | null>()
	const [isLoading, setIsLoading] = React.useState<boolean>(true)
	const [error, setError] = React.useState<boolean>(false)
	const [showToast, setShowToast] = React.useState<boolean>(false)
	// const [coinsMap, setCoinsMap] = React.useState<any[][]>()
	// console.log('coinsMap', coinsMap)

	// React.useEffect(() => {
	// 	if (coins) {
	// 		setCoinsMap(splitArrayIntoThree(coins))
	// 	}
	// }, [coins])

	const fetchUserData = async (id: string) => {
		setError(false)
		try {
			const response = await fetch(`/api/coins/get-all/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const result = await response.json()
			if (result.status === 'ERROR') {
				setUser(null)
				setCoins(null)
				setError(true)
			} else {
				const { user, coins } = result.data
				setUser(user)
				setCoins(coins)
			}
		} catch (error) {
			console.error(error)
			setError(true)
		} finally {
			setIsLoading(false)
		}
	}

	const handleShowToast = () => {
		setShowToast(true)
		setTimeout(() => {
			setShowToast(false)
		}, 10000)
	}

	React.useEffect(() => {
		if (id) {
			fetchUserData(id as string)
		}
	}, [id])

	React.useEffect(() => {
		if (error) {
			handleShowToast()
		}
	}, [error])

	// TODO: Add user icon
	return (
		<main className={`${styles.container} mx-auto py-8 flex flex-col space-y-4`}>
			{isLoading || error ? (
				<Loading />
			) : (
				<>
					<MyStuff />
					<MyCoins coins={coins!} />
				</>
			)}

			<div className="toast toast-center z-999">
				{showToast && (
					<div className="alert alert-error w-[300px]">
						<div>
							<span>There was an error fetching your data.</span>
						</div>
					</div>
				)}
			</div>
		</main>
	)
}

export default MyStuffPage

MyStuffPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>
