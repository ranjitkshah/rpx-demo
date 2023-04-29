import * as React from 'react'
import { useRouter } from 'next/router'
import { Coin } from '@/shared/types'
import { useCoinByCreator } from '@/components/hooks/useCoinByCreator'
import Loading from '@/components/general/Loading'
import Layout from '@/components/Layout/secondaryLayout'

// TODO: Update all loading instances with actual loading component from designs
// TODO: Add better error handling here
const BuyCoinPage = () => {
	const router = useRouter()
	const { creator } = router.query
	const { coin, isLoading, error } = useCoinByCreator(creator as string)

	return (
		<main>
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
