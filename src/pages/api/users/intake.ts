import {
	APIMethods,
	APIStatuses,
	CollectionNames,
	DocumentResponses,
	GeneralAPIResponses,
	TypedRequest,
	NewUser
} from '@/shared/types'
import { NextApiResponse } from 'next'
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'
import firebase_app from '@/lib/firebase'
import { withAuth } from '@clerk/nextjs/dist/api'

const handler = withAuth(async (req: TypedRequest<NewUser>, res: NextApiResponse) => {
	const { method, body } = req

	if (method !== APIMethods.POST || !body.clerkId) {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}

	try {
		const db = getFirestore(firebase_app)
		const userCollectionRef = collection(db, CollectionNames.USERS)
		const q = query(userCollectionRef, where('clerkId', '==', body.clerkId))
		const querySnapshot = await getDocs(q)
		const userDocumentRef = querySnapshot.docs.length ? querySnapshot.docs[0] : null

		if (userDocumentRef) {
			const userDocumentPath = userDocumentRef.ref.path
			const userDocumentRefToUpdate = doc(db, userDocumentPath)
			await updateDoc(userDocumentRefToUpdate, { userType: body.userType })
			res.json({ status: APIStatuses.SUCCESS, type: DocumentResponses.DATA_UPDATED, data: { user: userDocumentRef } })
		} else {
			const documentRef = await addDoc(userCollectionRef, body)
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
		}
	} catch (e) {
		console.error('e', e)
		res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
	}
})

export default handler
