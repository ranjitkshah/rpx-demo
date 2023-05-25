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
const fs = require('fs');


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
		console.log({fields,files});
		const { id, name, description } = fields
		console.log({id, name, description});
		const userRef = doc(db, CollectionNames.USERS, id as string)

		const image = files['image'] as PersistentFile;
		const imageBuffer = await fs.promises.readFile(image.filepath);


		// Log the buffer object to the console
		console.log(imageBuffer)

		// Check if the buffer object has a non-zero length
		if (imageBuffer && imageBuffer.length > 0) {
			console.log('Image parsed successfully!');
		  } else {
			console.log('Error parsing image!');
		}
		
		const uploadedImage = await uploadBytes(storageRef, new Uint8Array(imageBuffer))
		console.log({uploadedImage})
		try {
			const mintedCoinRef = await addDoc(coinsRef, {
				name,
				description,
				imageUrl: uploadedImage.ref.fullPath,
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
