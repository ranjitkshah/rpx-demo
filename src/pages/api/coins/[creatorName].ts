import firebase_app from '@/lib/firebase'
import { APIMethods, Coin, APIStatuses, DocumentResponses, GeneralAPIResponses, CollectionNames } from '@/shared/types'
import { withAuth } from '@clerk/nextjs/dist/api'
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'

const handler = withAuth(async (req, res) => {
	const { method } = req
	const { creatorName, isCreatorId } = req.query

	if (!creatorName) {
		console.error('e', DocumentResponses.DATA_NOT_FOUND)
		res.status(400).json({
			status: APIStatuses.ERROR,
			type: DocumentResponses.DATA_NOT_FOUND,
			data: { error: `No creator name passed to request.` }
		})
	}

	if (method === APIMethods.GET) {
		try {
			
			const db = getFirestore(firebase_app)
			const coinsCollectionRef = collection(db, CollectionNames.COINS)
			let q = query(coinsCollectionRef, where('creatorName', '==', creatorName))
			if(isCreatorId === 'true') {
				q = query(coinsCollectionRef, where('creatorId', '==', creatorName))
			} 
			const querySnapshot = await getDocs(q)
			
			if (querySnapshot.empty) {
				console.error('e', DocumentResponses.DATA_NOT_FOUND)
				res.status(400).json({
					status: APIStatuses.ERROR,
					type: DocumentResponses.DATA_NOT_FOUND,
					data: { error: `Could not find the coin made by ${creatorName}` }
				})
			}

			const coin = querySnapshot.docs[0].data()

			res.status(201).json({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_FOUND,
				data: { coin }
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
