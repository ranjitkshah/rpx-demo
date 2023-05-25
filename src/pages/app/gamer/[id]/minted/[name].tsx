import { MouseEventHandler, ReactElement } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Divider from '@/components/general/Divider'
import Layout from '@/components/Layout/mainLayout'
import styles from '../../../../../styles/pages/MyStuff.module.css'
import { useCoinByCreator } from '@/components/hooks/useCoinByCreator'
import Loading from '@/components/general/Loading'

const CoinCreated = () => {
	const router = useRouter()
	const { name } = router.query
	const { coin, isLoading: isCoinLoading, error: coinError } = useCoinByCreator(name as string)

	// const handleBuyClick: MouseEventHandler = () => {
	// 	router.push(`/app/coins/${creator}/buy`)
	// }

	return (
		<main
			className={`${styles.container} h-full w-full flex flex-col gap-2 items-center justify-start text-center text-white px-5`}
		>
			{/* {!coin && isCoinLoading && <Loading />} */}
			<>
				<div className={`mt-12`}>
					<Image src={require('../../../../../resources/images/ducoin.png')} width={200} height={200} alt={''} />
				</div>

				<div className="whitespace-normal w-2/3">
					<h1 className="text-5xl font-semibold">Coin Created!</h1>
				</div>

				<div className="flex w-full justify-between items-center bg-slate-800 rounded-lg p-5 shadow-md divide-x">
					<div className="flex items-center w-1/2">
						<Image src={require('../../../../../resources/images/ducoin.png')} width={50} height={50} alt={''} />
						<div className="w-10 ml-2">
							<p className="text-teal-500 text-xs whitespace-normal">{name}</p>
						</div>
					</div>
					<div className="flex justify-around items-center w-1/2">
						<p className="text-center text-xs">$25.00 USD</p>
						<button
							className="button bg-emerald-400 rounded-md text-black text-lg font-semibold p-3"
							onClick={() => console.log('will buy later')}
						>
							Buy
						</button>
					</div>
				</div>

				<Divider />

				<div className="space-y-2">
					<button className="bg-sky-400 p-4 w-full rounded-lg text-2xl">Share your coin</button>
					<button className="bg-purple-400 p-4 w-full rounded-lg text-2xl">Create a collectible</button>
				</div>
			</>
		</main>
	)
}

CoinCreated.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default CoinCreated
