import { APIMethods, APIStatuses, CollectionNames, DocumentResponses, GeneralAPIResponses } from '@/shared/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import firebase_app from '@/lib/firebase'
import { withAuth } from '@clerk/nextjs/dist/api'

const handler = withAuth(async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req
	const db = getFirestore(firebase_app)
	const collectionRef = collection(db, CollectionNames.USERS)

	if (method !== APIMethods.GET) {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}

	try {
		const querySnapshot = await getDocs(collectionRef)
		const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

		if (documents.length) {
			res.status(200).json({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_FOUND,
				data: { users: documents }
			})
		} else {
			console.error('e', DocumentResponses.DATA_NOT_FOUND)
			res.status(400).json({ status: APIStatuses.ERROR, type: DocumentResponses.DATA_NOT_FOUND })
		}
	} catch (e) {
		console.error('e', e)
		res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
	}
})

export default handler
