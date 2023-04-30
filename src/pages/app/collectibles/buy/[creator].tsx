import * as React from 'react'
import { useRouter } from 'next/router'
import { Coin } from '@/shared/types'
import { useCoinByCreator } from '@/components/hooks/useCoinByCreator'
import Loading from '@/components/general/Loading'
import Layout from '@/components/Layout/secondaryLayout'
import Image from 'next/image'

// TODO: Update all loading instances with actual loading component from designs
// TODO: Add better error handling here
const BuyCoinPage = () => {
	const router = useRouter()
	const { creator } = router.query
	console.log('routerQuery', creator)
	const { coin, isLoading, error } = useCoinByCreator(creator as string)
	const [imgSrc, setImgSrc] = React.useState<string>()
	console.log('imgSrc', imgSrc)

	React.useEffect(() => {
		if (coin) {
			// setImgSrc('/resources/images/coins/Ch40sQueen.png')
		}
	}, [coin])

	return (
		<main className="container">
			{coin && (
				<div className="flex flex-col">
					<div>{imgSrc && <Image src={imgSrc ? imgSrc : ''} alt={`${creator}'s coin!`} width={200} height={200} />}</div>
					<div>price</div>
					<div>amount</div>
					<div>numpad</div>
				</div>
			)}
			{isLoading && <Loading />}
			{error && (
				<div className="toast toast-center z-999">
					<div className="alert alert-error w-[300px]">
						<div>
							<span>
								Error creating account, contact
								<br /> charlie@sparksfullstack.io for help.
							</span>
						</div>
					</div>
				</div>
			)}
		</main>
	)
}

export default BuyCoinPage

BuyCoinPage.getLayout = (page: React.ReactChild) => <Layout>{page}</Layout>
