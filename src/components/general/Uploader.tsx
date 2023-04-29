import React, { ChangeEventHandler, DragEventHandler, useState } from 'react'

type UploaderProps = {
	onUpload: (file: File | null) => void
}

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
					<div className="w-36 h-36 bg-indigo-300 rounded-full flex justify-center items-center text-center p-5 m-auto">
						Drag file to upload
					</div>
				)}
			</div>
			<div className="mt-2">
				<>
					<span>or Select File to upload</span>
					{selectedFile ? (
						<button className="btn btn-sm btn-circle bg-red-400 text-black" onClick={handleClearClick}>
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
