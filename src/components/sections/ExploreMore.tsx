import React from 'react'
import styles from '../../styles/components/ExploreMore.module.css'
import Image from 'next/image'

// TODO: Wire up to display selected element on click with proper styles
const ExploreMore = () => {
	return (
		<div className="container">
			<h2 className={styles.scrollTitle}>Explore More</h2>

			<div className="w-[90%] mx-auto">
				<input
					className="px-2 rounded-lg border-0 h-[24px] text-sm w-[100%] mt-4 mb-2"
					type={'text'}
					placeholder={'Search'}
				/>
			</div>
			<div className={'flex flex-row justify-between mx-auto w-[90%]'}>
				<p className={styles.offwhite}>Top Teams</p>
				<p className={styles.white}>Top Gamers</p>
				<p className={styles.offwhite}>Top New Gamer</p>
				<p className={styles.offwhite}>Top Weekly Gamer</p>
			</div>
			<div className="mt-[-20px]">
				{/* TODO: Wire up these components */}
				<Image
					className="mx-auto"
					alt="Explore more image"
					src={require('../../resources/images/exploremore.png')}
					width={380}
					height={650}
				/>
			</div>
		</div>
	)
}

export default ExploreMore
