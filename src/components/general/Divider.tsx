import Divider from '../../resources/images/horizontalline.png'
import Image from 'next/image'

export default function () {
	return (
		<Image
			className="h-full my-4 mx-auto"
			src={Divider}
			alt=""
			priority={true}
		/>
	)
}
