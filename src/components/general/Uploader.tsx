import React, { ChangeEventHandler, DragEventHandler, SVGProps, useState } from 'react'

type UploaderProps = {
	onUpload: (file: File | null) => void
}

const UploadArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="210.895 270.192 60.696 120.115"
  >
    <path
      fill="#FFF"
      stroke="#FFF"
      d="M237.977 385.793l-.464-44.92-24.499.253 27.327-65.286 28.67 64.707-24.498.253.464 44.92-7 .073z"
    ></path>
  </svg>
)

// TODO: handle errors
const Uploader: React.FC<UploaderProps> = ({ onUpload }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [dragging, setDragging] = useState(false)

	const handleDragOver: DragEventHandler = (e) => {
		e.preventDefault()
		setDragging(true)
	}

	const handleDragLeave: DragEventHandler = (e) => {
		e.preventDefault()
		setDragging(false)
	}

	const handleDrop: DragEventHandler = (e) => {
		e.preventDefault()
		setDragging(false)
		const file = e.dataTransfer.files[0]
		setSelectedFile(file)
		onUpload(file)
	}

	const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		const file = target.files?.[0]
		if (file) {
			setSelectedFile(file)
			onUpload(file)
		}
	}

	const handleClearClick = () => {
		setSelectedFile(null)
		onUpload(null)
	}

	return (
		<div
			className={`drag-and-drop-uploader ${dragging ? 'dragging' : ''}`}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<div className="flex aspect-square rounded-full border-dashed border-cyan-500 border-2">
				{selectedFile ? (
					<img
						src={URL.createObjectURL(selectedFile)}
						alt="Selected file"
						className="rounded-full object-cover m-auto"
					></img>
				) : (
					<div className="w-36 h-36 bg-indigo-200 rounded-full flex flex-col justify-center items-center text-center p-5 m-auto">
						<UploadArrow />
						<p className="whitespace-normal text-2xl tracking-wide">Drag file to upload</p>
					</div>
				)}
			</div>
			<div className="mt-2">
				<>
					<span>or Select File to upload</span>
					{selectedFile ? (
						<button className="btn btn-sm btn-circle bg-red-400 text-black ml-2" onClick={handleClearClick}>
							-
						</button>
					) : (
						<>
							<label htmlFor="file-input" className="btn btn-sm btn-circle bg-teal-400 text-black ml-2">
								+
							</label>
							<input className="hidden" id="file-input" type="file" accept="image/*" onChange={handleInputChange} />
						</>
					)}
				</>
			</div>
		</div>
	)
}

export default Uploader
