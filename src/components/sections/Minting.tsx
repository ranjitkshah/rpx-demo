import Image from 'next/image'

const Minting: React.FC = () => (
	<main className="h-full w-full flex flex-col text-center text-white px-5">
		<div className="bg-black rounded-full h-200 w-200 mx-auto">
			<Image
				className="p-8"
				src={require('../../resources/images/loading.png')}
				alt="Loading"
				priority={true}
				height={200}
				width={200}
			/>
		</div>
		<div className="my-2">
			<p className="text-4xl text-white">Creating...</p>
		</div>
	</main>
)

export default Minting
