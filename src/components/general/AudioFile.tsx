import { useRouter } from 'next/router'
import { FC, useEffect, useRef } from 'react'
import { Howl } from 'howler'

interface Props {
	audioFile: string
}

const AudioFile: FC<Props> = ({ audioFile }) => {
	// const audioRef = useRef<HTMLAudioElement>(null)

	// useEffect(() => {
	// 	const audioElement = audioRef.current!
	// 	console.log('===client')

	// 	// Check if we're on the client side before playing the audio
	// 	if (typeof window !== 'undefined') {
	// 		audioElement.loop = true
	// 		audioElement?.play().catch((error) => {
	// 			// Handle play error if needed
	// 			console.log('Failed to play audio:', error)
	// 		})
	// 	}

	// 	// Optionally, you can pause the audio when the component unmounts
	// 	return () => {
	// 		audioElement?.pause()
	// 	}
	// }, [])

	// if (typeof window === 'undefined') {
	// 	return null // Render nothing on the server side
	// }

	// return (
	// 	<div>
	// 		<audio ref={audioRef} src="/resources/sounds/Theme.mp3" />
	// 	</div>
	// )
	const soundRef = useRef<Howl | null>(null)

	useEffect(() => {
		soundRef.current = new Howl({
			src: ['/resources/sounds/Theme.mp3'],
			autoplay: true,
			volume: 0.3
		})
	}, [])

	return (
		<div>
			{' '}
			<audio
			// @ts-ignore
			 ref={soundRef} autoPlay />
		</div>
	)
}

export default AudioFile
