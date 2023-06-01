import {
	APIMethods,
	APIStatuses,
	CollectionNames,
	DocumentResponses,
	GeneralAPIResponses,
	StorageNames
} from '@/shared/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { getStorage, ref as getStorageRef, uploadBytes, deleteObject, getDownloadURL, updateMetadata } from 'firebase/storage'
import { getRandomPrice } from '@/shared/utils'
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
		const usersCollectionRef = collection(db, CollectionNames.USERS)
		const q = query(usersCollectionRef, where('clerkId', '==', id))
		const querySnapshot = await getDocs(q)

		if (querySnapshot.empty) {
			console.error('e', DocumentResponses.DATA_NOT_FOUND)
			return res.status(400).json({
				status: APIStatuses.ERROR,
				type: DocumentResponses.DATA_NOT_FOUND,
				data: { error: `Could not find the user with clerk id ${id}` }
			})
		}

		const user = Object.assign(querySnapshot.docs[0].data(), {})
		console.log({user})
		const image = files['image'] as PersistentFile;
		const imageBuffer = await fs.promises.readFile(image.filepath);


		// Log the buffer object to the console
		console.log(image)

		// Check if the buffer object has a non-zero length
		if (imageBuffer && imageBuffer.length > 0) {
			console.log('Image parsed successfully!');
		  } else {
			console.log('Error parsing image!');
		}
		const imageName = new Date().getTime() + image.originalFilename;

		const storageRef = getStorageRef(getStorage(), `${StorageNames.COINS}/${imageName}`)


		try {

			const uploadedImage = await uploadBytes(storageRef, new Uint8Array(imageBuffer))
						const newMetadata = {
				contentType: image.mimetype
			  };
			await updateMetadata(storageRef, newMetadata);
	
			const downloadURL = await getDownloadURL(storageRef);
	
				const mintedCoinRef = await addDoc(coinsRef, {
				name,
				description,
				imageUrl:downloadURL,
				creatorId: user.clerkId,
				creatorName: user.firstName,
				currentPrice: getRandomPrice(1, 100),
				previousPrice: getRandomPrice(1, 100),
				amountMinted: getRandomPrice(1, 100),
			})

			res.status(201).json({
				status: APIStatuses.SUCCESS,
				type: DocumentResponses.DATA_CREATED,
				data: { user: { id: mintedCoinRef.id } }
			})
		} catch (e) {
			// deleteObject(uploadedImage.ref)
			throw e
		}
	} catch (e) {
		console.error(e)
		res.status(400).json({ status: APIStatuses.ERROR, type: GeneralAPIResponses.FAILURE, data: { error: e } })
	}
})

export default handler
