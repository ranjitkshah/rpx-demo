import firebase_app from '@/lib/firebase'
import { APIMethods, Coin, APIStatuses, DocumentResponses, GeneralAPIResponses, CollectionNames } from '@/shared/types'
import { withAuth } from '@clerk/nextjs/api'
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'

// TODO: Consolidate this with the other ID query route
const handler = withAuth(async (req, res) => {
	const { method } = req
	const { id } = req.query

	if (!id) {
		console.error('e', DocumentResponses.DATA_NOT_FOUND)
		res.status(400).json({
			status: APIStatuses.ERROR,
			type: DocumentResponses.DATA_NOT_FOUND,
			data: { error: `No clerk id passed to request.` }
		})
	}

	if (method === APIMethods.GET) {
		try {
			const db = getFirestore(firebase_app)
			const usersCollectionRef = collection(db, CollectionNames.USERS)
			const q = query(usersCollectionRef, where('clerkId', '==', id))
			const querySnapshot = await getDocs(q)

			if (querySnapshot.empty) {
				console.error('e', DocumentResponses.DATA_NOT_FOUND)
				return res.status(404).json({
					status: APIStatuses.ERROR,
					type: DocumentResponses.DATA_NOT_FOUND,
					data: { error: `Could not find the user with the clerk id of ${id}` }
				})
			}

			const user = querySnapshot.docs[0].data()

			res.status(200).json({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_FOUND,
				data: { user: { ...user, id: querySnapshot.docs[0].id } }
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
