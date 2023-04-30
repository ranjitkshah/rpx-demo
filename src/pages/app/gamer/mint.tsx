import Image from 'next/image'
import React, { ChangeEventHandler, useState } from 'react'
import Uploader from '@/components/general/Uploader'
import { Maybe } from '@/shared/types'
import Minting from '@/components/sections/Minting'

const CreateCoinPage = () => {
	const [name, setName] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [image, setImage] = useState<Maybe<File>>()

	const [saving, setSaving] = useState<boolean>(false)

	const isValid = name && description && image
	console.log('rendering', { name, description, image, isValid })

	const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		console.log('update description', {
			old: description,
			new: e.target.value
		})
		setDescription(e.target.value)
	}

	const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		console.log('update name', name, {
			old: name,
			new: e.target.value
		})
		setName(e.target.value)
	}

	const handleImageUpload = (file: Maybe<File>) => {
		console.log('update state', {
			old: image,
			new: file
		})
		setImage(file)
	}

	const mintCoint = async () => {
		setSaving(true)

		setTimeout(() => {
			setSaving(false)
		})
	}

	if (saving) {
		return <Minting />
	}

	return (
		<main className="h-[100vh] w-full flex flex-col text-center text-white p-5 divide-y">
			<header>
				<div className="flex">
					<button className="btn btn-sm btn-circle absolute top-8 opacity-25">
						<Image
							onClick={() => {
								alert('go back!')
							}}
							alt="Back button"
							src={require('../../../resources/images/back.png')}
						/>
					</button>
					<Image
						className="mx-auto max-w-[100px] mb-2"
						src={require('../../../resources/images/coin-GREY.png')}
						alt="Create a coin"
						priority={true}
					/>
				</div>
				<h1>Create a Coin</h1>
			</header>

			<section id="upload" className="py-5">
				<div className="flex items-center justify-center">
					<Uploader
						onUpload={handleImageUpload}
					/>
				</div>
			</section>

			<section id="info" className="py-5">
				<div className="flex flex-col items-center gap-5">
					<input
						type="text"
						name="name"
						placeholder="Name that coin"
						value={name}
						onChange={handleNameChange}
						className="input input-md w-full rounded-lg p-5"
					/>
					<textarea
						name="description"
						placeholder="Add a description"
						value={description}
						onChange={handleDescriptionChange}
						className="textarea textarea-bordered w-full rounded-lg p-5"
					></textarea>
				</div>
			</section>

			<footer className="py-5 mt-auto">
				{/* <button disabled={!isValid} className="btn btn-block normal-case bg-purple-400 p-5 disabled:bg-grey-200 disbled:text-white">Press Start</button> */}
				<button
					disabled={!isValid}
					className="bg-purple-400 p-5 w-full rounded-lg disabled:bg-neutral-300 disbled:text-white text-2xl"
				>
					Press Start
				</button>
				<div className="flex gap-4 mt-2">
					<span className="btn btn-sm btn-circle bg-teal-400 text-black">/</span>
					<span className="text-xs">By proceeding I confirm that I have the rights to distribute the above content</span>
				</div>
			</footer>
		</main>
	)
}

export default CreateCoinPage
