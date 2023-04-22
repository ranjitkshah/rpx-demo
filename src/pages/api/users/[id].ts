import { APIMethods, APIStatuses, CollectionNames, DocumentResponses, GeneralAPIResponses } from '@/shared/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import firebase_app from '@/lib/firebase'
import { withAuth } from '@clerk/nextjs/dist/api'

const handler = withAuth(async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req
	const { id } = req.query as { id: string }

	if (!id) {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}

	if (method === APIMethods.GET) {
		try {
			const db = getFirestore(firebase_app)
			const collectionRef = doc(db, CollectionNames.USERS, id)
			const documentSnapshot = await getDoc(collectionRef)

			if (documentSnapshot.exists()) {
				const document = documentSnapshot.data()
				return res.status(200).json({
					status: APIStatuses.SUCCESS,
					type: DocumentResponses.DATA_FOUND,
					data: { user: { id, ...document } }
				})
			} else {
				console.error('e', DocumentResponses.DATA_NOT_FOUND)
				return res.status(400).json({ status: APIStatuses.ERROR, type: DocumentResponses.DATA_NOT_FOUND })
			}
		} catch (e) {
			console.error('e', e)
			return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else if (method === APIMethods.PATCH) {
		// update logic goes here
	} else if (method === APIMethods.DELETE) {
		// delete logic goes here
	} else {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}
})

export default handler
