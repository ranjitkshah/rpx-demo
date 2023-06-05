import Image from 'next/image'
import * as React from 'react'
import { createPortal } from 'react-dom'

type Props = {
	isOpen: boolean
	content: React.ReactNode
	handleClose: () => void
	onClick?: () => void
}

const Modal = ({ isOpen, content, handleClose, onClick }: Props) => {
	const modalRef = React.useRef(null)

	const handleBlur = (event: any) => {
		// Check if the blurred element is the backdrop
		if (event.currentTarget === event.target) {
			// Perform actions when the modal loses focus
			handleClose()
		}
	}
	return (
		<div onClick={onClick} className={`modal ${isOpen ? 'modal-open' : ''}`}>
			<div
				className="modal-box relative w-[94vw] max-w-[352px] h-[98vh] max-h-[650px] rounded-none overflow-y-hidden"
				onBlur={handleBlur}
				tabIndex={0}
				ref={modalRef}
			>
				<label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute left-2 top-2">
					<Image onClick={handleClose} alt="Back button" src={require('../../resources/images/back.png')} />
				</label>
				{content}
			</div>
		</div>
	)
}

export default Modal
