import * as React from 'react'
import { createPortal } from 'react-dom'

type Props = {
	isOpen: boolean
	content: React.ReactNode
	handleClose: () => void
}

const Modal = ({ isOpen, content, handleClose }: Props) => {
	return (
		<div className={`modal ${isOpen ? 'modal-open' : ''}`}>
			<div className="modal-box relative h-screen">
				<label onClick={handleClose} htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute left-2 top-2">
					✕
				</label>
				{content}
			</div>
		</div>
	)
}

export default Modal
