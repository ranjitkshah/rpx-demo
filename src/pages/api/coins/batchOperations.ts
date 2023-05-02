import {
	APIMethods,
	APIStatuses,
	CollectionNames,
	DocumentResponses,
	GeneralAPIResponses,
	TypedRequest,
	NewUser,
	Coin
} from '@/shared/types'
import { NextApiResponse } from 'next'
import { collection, doc, getDocs, getFirestore, writeBatch } from 'firebase/firestore'
import firebase_app from '@/lib/firebase'
import { withAuth } from '@clerk/nextjs/dist/api'
import { getRandomInt, getRandomPrice } from '@/shared/utils'
import { currentCoinCreatorNames } from '@/shared/constants'

// TODO: We need to re-run this at a set interval w/ the patch request for price flucuations
const handler = withAuth(async (req: TypedRequest<NewUser>, res: NextApiResponse) => {
	const { method, body } = req

	const db = getFirestore(firebase_app)
	const batch = writeBatch(db)
	const coinCollectionRef = collection(db, CollectionNames.COINS)

	if (method === APIMethods.POST) {
		try {
			currentCoinCreatorNames.forEach((coinName) => {
				const coinsRef = doc(coinCollectionRef)
				const mintedAmount = getRandomInt(1, 100)
				const newCoin: Coin = {
					name: `${coinName}'s Coin`,
					creatorName: coinName,
					currentPrice: getRandomPrice(1, 100),
					previousPrice: getRandomPrice(1, 100),
					amountMinted: mintedAmount,
					amountPurchased: getRandomInt(1, 10),
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString()
				}
				batch.set(coinsRef, newCoin)
			})

			await batch.commit()

			res.status(201).json({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_CREATED
			})
		} catch (e) {
			console.error('e', e)
			res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else if (method === APIMethods.PATCH) {
		const querySnapshot = await getDocs(coinCollectionRef)
		const coinDocuments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

		coinDocuments.forEach((coinDocument) => {
			const coinDocumentRef = doc(db, CollectionNames.COINS, coinDocument.id)
			const updatedCoinData = {
				currentPrice: getRandomPrice(1, 100),
				// @ts-ignore
				previousPrice: coinDocument.currentPrice,
				updatedAt: new Date().toISOString()
			}
			batch.update(coinDocumentRef, updatedCoinData)
		})

		await batch.commit()

		res.status(201).json({
			status: APIStatuses.SUCCESS,
			type: DocumentResponses.DATA_UPDATED
		})
	} else {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}
})

export default handler
