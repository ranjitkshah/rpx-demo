import Image from 'next/image'
import React, { ChangeEventHandler, useState } from 'react'
import Uploader from '@/components/general/Uploader'

const CreateCoinPage = () => {
	const [name, setName] = useState<string>()
	const [description, setDescription] = useState<string>()
	const [image, setImage] = useState<File>()

	const isValid = name && description && image

	const handleDescriptionChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		console.log('update state', e)
	}

	const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		console.log('update state', e)
	}

	const handleImageUpload = (image: File) => {
		console.log('update state', image)
	}

	return (
		<main className="h-[100vh] w-full flex flex-col text-center text-white p-5 divide-y">
			<header>
				<div className="flex">
					<button className="btn btn-sm btn-circle absolute opacity-25">
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
						onUpload={(file) => {
							console.log('file uploaded. add it to theform', file)
						}}
					/>
				</div>
			</section>

			<section id="info" className="py-5">
				<div className="flex flex-col items-center gap-5">
					<input type="text" name="name" placeholder="Name that coin" className="input input md w-full rounded-lg p-5" />
					<textarea
						name="description"
						placeholder="Add a description"
						className="textarea textarea-bordered w-full rounded-lg p-5"
					></textarea>
				</div>
			</section>

			<footer className="py-5 mt-auto">
				<button disabled={!isValid} className="btn btn-block normal-case bg-purple-400 w-full p-5">Press Start</button>
				<div className="flex gap-4 mt-2">
					<input type="radio" name="consent" className="radio checked:bg-teal-400" checked />
					<span className="text-sm">By clicking this big button you agree to some stuff</span>
				</div>
			</footer>
		</main>
	)
}

export default CreateCoinPage
