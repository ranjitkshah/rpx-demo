import {
	APIMethods,
	APIStatuses,
	CollectionNames,
	DocumentResponses,
	GeneralAPIResponses,
	StorageNames
} from '@/shared/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { addDoc, collection, doc, getFirestore } from 'firebase/firestore'
import { getStorage, ref as getStorageRef, uploadBytes, deleteObject } from 'firebase/storage'
import firebase_app from '@/lib/firebase'
import { withAuth } from '@clerk/nextjs/dist/api'
import formidable, { Fields, Files } from 'formidable'

// Disable NextJS body parsing for multipart form
export const config = {
	api: {
		bodyParser: false
	}
}

const db = getFirestore(firebase_app)
const coinsRef = collection(db, CollectionNames.COINS)
const storageRef = getStorageRef(getStorage(), StorageNames.COINS)

const form = formidable({
	multiples: true,
	maxFileSize: 500 * 1024 * 1024 // set max file size to 500MB
})

function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
	return new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err) reject(err)
			resolve({ fields, files })
		})
	})
}

const handler = withAuth(async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req
	if (method !== APIMethods.POST) {
		return res.status(404).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.INVALID_REQUEST_TYPE })
	}

	try {
		const { fields, files } = await parseForm(req)
		const { id, name, description } = fields

		const userRef = doc(db, CollectionNames.USERS, id as string)

		const image = files['image'] as unknown as File

		const imageBuffer = await image.arrayBuffer()

		// Log the buffer object to the console
		console.log(imageBuffer)

		// Check if the buffer object has a non-zero length
		if (imageBuffer.byteLength > 0) {
			console.log('Image parsed successfully!')
		} else {
			console.log('Error parsing image!')
		}

		const uploadedImage = await uploadBytes(storageRef, image)

		try {
			const mintedCoinRef = await addDoc(coinsRef, {
				name,
				description,
				image: uploadedImage.ref,
				creatorRef: userRef
			})

			res.status(201).json({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_CREATED,
				data: { user: { id: mintedCoinRef.id } }
			})
		} catch (e) {
			deleteObject(uploadedImage.ref)
			throw e
		}
	} catch (e) {
		console.error(e)
		res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
	}
})

export default handler
