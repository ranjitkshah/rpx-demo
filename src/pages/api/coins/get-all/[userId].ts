import firebase_app from '@/lib/firebase'
import { APIMethods, APIStatuses, CollectionNames, DocumentResponses, GeneralAPIResponses } from '@/shared/types'
import { withAuth } from '@clerk/nextjs/dist/api'
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore'

const handler = withAuth(async (req, res) => {
	const { method, body } = req
	const { userId } = req.query

	if (method === APIMethods.GET) {
		if (!userId) {
			console.error('e', DocumentResponses.DATA_NOT_FOUND)
			res.status(400).json({
				status: APIStatuses.ERROR,
				type: DocumentResponses.DATA_NOT_FOUND,
				data: { error: `User ID not provided` }
			})
		}

		try {
			const db = getFirestore(firebase_app)
			const userDocRef = doc(db, CollectionNames.USERS, userId as string)
			const userDocSnapshot = await getDoc(userDocRef)

			if (!userDocSnapshot.exists()) {
				return res.status(404).json({ error: 'User not found' })
			}

			const user = userDocSnapshot.data()
			const ownedCoins = user.ownedCoins

			if (!Array.isArray(ownedCoins)) {
				return res.status(400).json({ error: 'ownedCoins property is missing or not an array' })
			}

			const coinsCollectionRef = collection(db, CollectionNames.COINS)
			const coinDocsPromises = ownedCoins.map((coinId: string) => getDoc(doc(coinsCollectionRef, coinId)))

			const coinDocsSnapshots = await Promise.all(coinDocsPromises)
			const coins = coinDocsSnapshots.map((coinDocSnapshot) => ({
				id: coinDocSnapshot.id,
				...coinDocSnapshot.data()
			}))

			return res.status(200).json({ data: { coins, user } })
		} catch (e) {
			console.error('e', e)
			return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}
})

export default handler
