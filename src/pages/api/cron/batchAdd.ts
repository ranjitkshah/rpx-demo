import firebase_app from '@/lib/firebase'
import { currentCoinCreatorNames } from '@/shared/constants'
import { CollectionNames, Coin, APIStatuses, DocumentResponses, GeneralAPIResponses } from '@/shared/types'
import { getRandomInt, getRandomPrice } from '@/shared/utils'
import { getFirestore, writeBatch, collection, doc } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'

export default async function handler(req: NextRequest) {
	const db = getFirestore(firebase_app)
	const batch = writeBatch(db)
	const coinCollectionRef = collection(db, CollectionNames.COINS)

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

		return new NextResponse(
			JSON.stringify({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_CREATED
			}),
			{
				status: 200
			}
		)
	} catch (e) {
		return new NextResponse(
			JSON.stringify({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } }),
			{
				status: 400
			}
		)
	}
}
