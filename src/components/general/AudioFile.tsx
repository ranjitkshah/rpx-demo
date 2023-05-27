import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

interface Props {
	audioFile: string
}

const AudioFile: FC<Props> = ({ audioFile }) => {
	const router = useRouter()

	useEffect(() => {
		console.log('==', { audioFile, router, window })
		if (typeof window !== 'undefined' && router.pathname.includes('app')) {
			console.log('==', { audioFile, router, window })
			const audio = new Audio(audioFile)
			audio.loop = true
			audio.play()

			return () => {
				audio.pause()
			}
		}
	}, [audioFile])

	return null
}

export default AudioFile
