import Image from 'next/image'
import React, { ChangeEventHandler, FormEventHandler, ReactElement, useRef, useState } from 'react'
import Uploader from '@/components/general/Uploader'
import { Maybe } from '@/shared/types'
import Minting from '@/components/sections/Minting'
import Layout from '@/components/Layout/secondaryLayout'
import Divider from '@/components/general/Divider'
import { useRouter } from 'next/router'

// TODO: handle big image load
// TODO: validate text inputs?
// TODO: add interactivity and reactivity
// TODO: upload error handling
const MintCoinPage = () => {
	const router = useRouter()
	const { id } = router.query

	const [name, setName] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [image, setImage] = useState<Maybe<File>>(null)

	const [saving, setSaving] = useState<boolean>(false)

	const isValid = name && description && image

	const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setDescription(e.target.value)
	}

	const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setName(e.target.value)
	}

	const handleImageUpload = (file: Maybe<File>) => {
		setImage(file)
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		setSaving(true)

		const form = e.currentTarget
		const formData = new FormData(form)
		formData.append('id', id as string)
		formData.append('image',image as File)	
		try {
			const response = await fetch(form.action, {
				method: form.method,
				body: formData
			})
			const result = await response.json()
		} catch (e) {
			console.error('bad coiin!', e)
		}
		setTimeout(() => {
			router.push(`/app/gamer/${id}/minted/${name}`)
		}, 5000)
		// setSaving(false)
	}

	if (saving) {
		return (
			<Layout>
				<Minting />
			</Layout>
		)
	}

	return (
		<Layout
			logo={
				<Image
					className="mx-auto max-w-[100px] mb-2 translate-y-[28px]"
					src={require('../../../../resources/images/coin-GREY.png')}
					alt="Create a coin"
					priority={true}
				/>
			}
			title={<h1 className="text-center text-white text-3xl mb-2">Create a Coin</h1>}
		>
			<main className="text-center text-white px-5 bg-[#26175a]">
				<Divider />

				<section id="upload">
					<div className="flex items-center justify-center max-w-[200px] mx-auto">
						<Uploader onUpload={handleImageUpload} />
					</div>
				</section>

				<Divider />

				<section id="info" className="py-5">
					<form action="/api/coins/mint" method="post" onSubmit={handleSubmit}>
						<div className="flex flex-col items-center gap-5">
							<input
								type="text"
								name="name"
								placeholder="Name that coin"
								value={name}
								onChange={handleNameChange}
								className="input input-md w-full rounded-lg text-black text-center"
							/>
							<textarea
								name="description"
								placeholder="Add a description"
								value={description}
								onChange={handleDescriptionChange}
								className="textarea textarea-bordered w-full rounded-lg text-black text-center flex items-center justify-center"
							></textarea>
						</div>

						<Divider />

						<button
							type="submit"
							disabled={!isValid}
							className="bg-purple-400 p-5 w-full rounded-lg disabled:bg-neutral-300 disbled:text-white text-2xl"
						>
							Press Start
						</button>
						<div className="flex gap-4 mt-2">
							{/* <span className="btn btn-sm btn-circle bg-teal-400 text-black">/</span> */}
							<span className="text-xs">By proceeding I confirm that I have the rights to distribute the above content</span>
						</div>
					</form>
				</section>
			</main>
		</Layout>
	)
}

// // TODO: Layout builder?
// MintCoinPage.getLayout = (page: ReactElement) => (
// 	<Layout
// 		logo={
// 			<Image
// 				className="mx-auto max-w-[100px] mb-2"
// 				src={require('../../../resources/images/coin-GREY.png')}
// 				alt="Create a coin"
// 				priority={true}
// 			/>
// 		}
// 		title={<h1 className="text-center text-white text-2xl">Create a Coin</h1>}
// 	>
// 		{page}
// 	</Layout>
// )

export default MintCoinPage
