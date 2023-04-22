import { APIMethods, APIStatuses, CollectionNames, DocumentResponses, GeneralAPIResponses } from '@/shared/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { deleteDoc, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import firebase_app from '@/lib/firebase'
import { withAuth } from '@clerk/nextjs/dist/api'

const handler = withAuth(async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req
	const { id } = req.query as { id: string }
	const db = getFirestore(firebase_app)
	const documentRef = doc(db, CollectionNames.USERS, id)

	if (!id) {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}

	if (method === APIMethods.GET) {
		try {
			const documentSnapshot = await getDoc(documentRef)

			if (documentSnapshot.exists()) {
				const document = documentSnapshot.data()
				return res.status(200).json({
					status: APIStatuses.SUCCESS,
					type: DocumentResponses.DATA_FOUND,
					data: { user: { id, ...document } }
				})
			} else {
				console.error('e', DocumentResponses.DATA_NOT_FOUND)
				return res.status(400).json({
					status: APIStatuses.ERROR,
					type: DocumentResponses.DATA_NOT_FOUND,
					data: { error: 'Document does not exist.' }
				})
			}
		} catch (e) {
			console.error('e', e)
			return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else if (method === APIMethods.PATCH) {
		try {
			const updatedData = req.body
			await updateDoc(documentRef, updatedData)
			const result = await getDoc(documentRef)
			const document = result.data()

			return res
				.status(200)
				.json({ status: APIStatuses.SUCCESS, type: DocumentResponses.DATA_UPDATED, data: { user: document } })
		} catch (e) {
			console.error('e', e)
			return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else if (method === APIMethods.DELETE) {
		try {
			await deleteDoc(documentRef)

			return res.status(200).json({ status: APIStatuses.SUCCESS, type: DocumentResponses.DATA_DELETED })
		} catch (e) {
			console.error('e', e)
			return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}
})

export default handler
