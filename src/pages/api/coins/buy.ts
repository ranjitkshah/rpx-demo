import firebase_app from '@/lib/firebase'
import { APIMethods, APIStatuses, CollectionNames, DocumentResponses, GeneralAPIResponses } from '@/shared/types'
import { withAuth } from '@clerk/nextjs/api'
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore'

const handler = withAuth(async (req, res) => {
	const { method, body } = req
	const { creatorName, userId, numberOfCoins } = body

	if (method === APIMethods.POST) {
		if (!creatorName || !userId || !numberOfCoins) {
			console.error('e', DocumentResponses.DATA_NOT_FOUND)
			res.status(400).json({
				status: APIStatuses.ERROR,
				type: DocumentResponses.DATA_NOT_FOUND,
				data: { error: `Body did not have all required data` }
			})
		}

		try {
			const db = getFirestore(firebase_app)
			const coinsCollectionRef = collection(db, CollectionNames.COINS)
			const coinsQ = query(coinsCollectionRef, where('creatorName', '==', creatorName))
			const coinsQuerySnapshot = await getDocs(coinsQ)
			const usersCollectionRef = collection(db, CollectionNames.USERS)
			const usersQ = query(usersCollectionRef, where('clerkId', '==', userId))
			const usersQuerySnapshot = await getDocs(usersQ)

			if (coinsQuerySnapshot.empty || usersQuerySnapshot.empty) {
				console.error('e', DocumentResponses.DATA_NOT_FOUND)
				res.status(404).json({
					status: APIStatuses.ERROR,
					type: DocumentResponses.DATA_NOT_FOUND,
					data: { error: `Could not find data for either the user or coin you were trying to update.` }
				})
			}

			const coinDocumentPath = coinsQuerySnapshot.docs[0].ref.path
			const userDocumentPath = usersQuerySnapshot.docs[0].ref.path
			const foundCoin = Object.assign(coinsQuerySnapshot.docs[0].data(), { id: coinsQuerySnapshot.docs[0].id })
			const foundUser = Object.assign(usersQuerySnapshot.docs[0].data(), { id: usersQuerySnapshot.docs[0].id })
			const numberOfCoinsAvailable = foundCoin.amountMinted - foundCoin.amountPurchased
			const ableToPurchase = foundUser.walletFunds >= foundCoin.currentPrice && numberOfCoinsAvailable >= numberOfCoins

			if (foundUser.walletFunds < foundCoin.currentPrice) {
				// TODO: make a custom error type for this
				return res.status(400).json({
					status: APIStatuses.ERROR,
					type: GeneralAPIResponses.FAILURE,
					data: { error: 'User did not have enough funds' }
				})
			} else if (!ableToPurchase) {
				// TODO: also make a custom error type for gods sake i'm ass at programming
				// TODO: Confirm that we want to handle this case here
				return res.status(400).json({
					status: APIStatuses.ERROR,
					type: GeneralAPIResponses.FAILURE,
					data: { error: 'There were not enough coins availible for you to purchase!' }
				})
			} else {
				// TODO: We need to handle fractional amounts of both of these here
				const formattedNumberOfCoins = Number(numberOfCoins)
				foundCoin.amountPurchased += formattedNumberOfCoins
				foundUser.walletFunds -= parseFloat((foundCoin.currentPrice * formattedNumberOfCoins).toFixed())
				// TODO: Replace with actual doc references in the future
				foundUser.ownedCoins = foundUser.ownedCoins?.length ? [...foundUser.ownedCoins] : []

				for (let i = 0; i < formattedNumberOfCoins; i++) {
					foundUser.ownedCoins.push(foundCoin.id)
				}

				const coinDocumentRefToUpdate = doc(db, coinDocumentPath)
				const userDocumentRefToUpdate = doc(db, userDocumentPath)
				await updateDoc(coinDocumentRefToUpdate, { ...foundCoin })
				await updateDoc(userDocumentRefToUpdate, { ...foundUser })

				res.json({
					status: APIStatuses.SUCCESS,
					type: DocumentResponses.DATA_UPDATED,
					data: { user: foundUser, coin: foundCoin }
				})
			}
		} catch (e) {
			console.error('e', e)
			return res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
		}
	} else {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}
})

export default handler
