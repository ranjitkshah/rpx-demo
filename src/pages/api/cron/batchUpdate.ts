import firebase_app from '@/lib/firebase'
import { CollectionNames, APIStatuses, DocumentResponses, GeneralAPIResponses } from '@/shared/types'
import { getRandomPrice } from '@/shared/utils'
import { getFirestore, writeBatch, collection, doc, getDocs } from 'firebase/firestore'
import { NextRequest, NextResponse } from 'next/server'

export default async function handler(req: NextRequest) {
	const db = getFirestore(firebase_app)
	const batch = writeBatch(db)
	const coinCollectionRef = collection(db, CollectionNames.COINS)

	try {
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

		return new NextResponse(
			JSON.stringify({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_UPDATED
			}),
			{
				status: 201
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
