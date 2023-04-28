import {
	APIMethods,
	APIStatuses,
	CollectionNames,
	DocumentResponses,
	GeneralAPIResponses,
	TypedRequest,
	RPXUser
} from '@/shared/types'
import { NextApiResponse } from 'next'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import firebase_app from '@/lib/firebase'
import { withAuth } from '@clerk/nextjs/dist/api'

// TODO: Add shape validation here?
const handler = withAuth(async (req: TypedRequest<RPXUser>, res: NextApiResponse) => {
	const { method, body } = req
	const db = getFirestore(firebase_app)
	const collectionRef = collection(db, CollectionNames.USERS)

	if (method !== APIMethods.POST) {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}

	try {
		const documentRef = await addDoc(collectionRef, body)

		if (documentRef.id) {
			res.status(201).json({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_CREATED,
				data: { user: { id: documentRef.id, ...body } }
			})
		} else {
			console.error('e', DocumentResponses.DATA_NOT_CREATED)
			res.status(400).json({
				status: APIStatuses.ERROR,
				type: DocumentResponses.DATA_NOT_CREATED,
				data: { error: 'Could not create user' }
			})
		}
	} catch (e) {
		console.error('e', e)
		res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
	}
})

export default handler
