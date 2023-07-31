import firebase_app from '@/lib/firebase'
import { CollectionNames, Coin, APIStatuses, DocumentResponses, GeneralAPIResponses } from '@/shared/types'
import { getRandomPrice } from '@/shared/utils'
import { getFirestore, writeBatch, collection, doc, getDocs } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'

export default async function handler(req: NextRequest) {
	const db = getFirestore(firebase_app)
	const batch = writeBatch(db)
	const coinCollectionRef = collection(db, CollectionNames.COINS)
	try {
		// Fetch all current coins data
		const querySnapshot = await getDocs(coinCollectionRef)
		const currentCoinsData: Coin[] = []
		querySnapshot.forEach((doc) => {
			currentCoinsData.push(doc.data() as Coin)
		})

		// Update random prices for each coin

		currentCoinsData.forEach((coin) => {
			coin.previousPrice = coin.currentPrice // Set random price here
			coin.currentPrice = getRandomPrice(coin.currentPrice, 5, 10) // Set random price here

			batch.update(doc(coinCollectionRef, coin.id), coin)
		})

		await batch.commit()

		return new NextResponse(
			JSON.stringify({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_UPDATED,
				data: currentCoinsData
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
