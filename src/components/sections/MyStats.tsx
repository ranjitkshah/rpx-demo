import Image from 'next/image'
import React from 'react'
import styles from '../../styles/pages/MyStuff.module.css'

const MyStats = () => {
	return (
		<div>
			<h2 className={`${styles.greenText} text-2xl mb-4 ml-4`}>About Current Sets</h2>
			<Image
				className="w-[90vh] max-w-[370px] mx-auto"
				alt="user page"
				src={require('../../resources/images/coins/userpage.png')}
			/>
		</div>
	)
}

export default MyStats
