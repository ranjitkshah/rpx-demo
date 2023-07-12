import firebase_app from '@/lib/firebase'
import { APIMethods, Coin, APIStatuses, DocumentResponses, GeneralAPIResponses, CollectionNames } from '@/shared/types'
import { withAuth } from '@clerk/nextjs/api'
import { collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'

const handler = withAuth(async (req, res) => {
	const { method, body } = req
	const { coinId, userId } = body

	if (!coinId || !userId) {
		console.error('e', DocumentResponses.DATA_NOT_FOUND)
		return res.status(400).json({
			status: APIStatuses.ERROR,
			type: DocumentResponses.DATA_NOT_FOUND,
			data: { error: `Coin ID or user ID was missing on the request body.` }
		})
	}

	if (method === APIMethods.PATCH) {
		try {
			const db = getFirestore(firebase_app)
			const usersCollectionRef = collection(db, CollectionNames.USERS)
			const q = query(usersCollectionRef, where('clerkId', '==', userId))
			const querySnapshot = await getDocs(q)

			if (querySnapshot.empty) {
				console.error('e', DocumentResponses.DATA_NOT_FOUND)
				return res.status(400).json({
					status: APIStatuses.ERROR,
					type: DocumentResponses.DATA_NOT_FOUND,
					data: { error: `Could not find the user with clerk id ${userId}` }
				})
			}

			const user = Object.assign(querySnapshot.docs[0].data(), {})
			const likedCoins = user.likedCoins ? [...user.likedCoins] : []
			if (likedCoins.includes(coinId)) {
				const index = likedCoins.indexOf(coinId)
				likedCoins.splice(index, 1)
			} else {
				likedCoins.push(coinId)
			}
			user.likedCoins = likedCoins

			const userDocumentPath = querySnapshot.docs[0].ref.path
			const userDocumentRefToUpdate = doc(db, userDocumentPath)

			await updateDoc(userDocumentRefToUpdate, user)

			res.status(201).json({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_UPDATED
			})
		} catch (e) {
			console.error('e', e)
			return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}
})

export default handler
