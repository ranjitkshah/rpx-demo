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
			<div className="">
				{/* TODO: Wire up these components */}
				<div className="flex w-full justify-between items-center bg-slate-800 rounded-lg p-3 my-4 shadow-md divide-x">
					<div className="flex items-center w-1/2">
						<Image src={require('../../resources/images/ducoin.png')} width={50} height={50} alt={''} />
						<div className="ml-2">
							<p className="text-teal-500 text-xs whitespace-normal">Gamer Name</p>
							<p className="text-teal-500 text-xs whitespace-normal">Gamer Name</p>
						</div>
					</div>
					<div className="flex justify-around items-center w-1/2">
						<p className="text-center text-xs">$25.00 USD</p>
						<button
							className="button bg-emerald-400 rounded-md text-black text-lg font-semibold p-3"
							onClick={() => console.log('will buy later')}
						>
							Buy
						</button>
					</div>
				</div>
				<div className="flex w-full justify-between items-center bg-slate-800 rounded-lg p-3 my-4 shadow-md divide-x">
					<div className="flex items-center w-1/2">
						<Image src={require('../../resources/images/ducoin.png')} width={50} height={50} alt={''} />
						<div className="ml-2">
							<p className="text-teal-500 text-xs whitespace-normal">Gamer Name</p>
							<p className="text-teal-500 text-xs whitespace-normal">Gamer Name</p>
						</div>
					</div>
					<div className="flex justify-around items-center w-1/2">
						<p className="text-center text-xs">$25.00 USD</p>
						<button
							className="button bg-emerald-400 rounded-md text-black text-lg font-semibold p-3"
							onClick={() => console.log('will buy later')}
						>
							Buy
						</button>
					</div>
				</div>
				<div className="flex w-full justify-between items-center bg-slate-800 rounded-lg p-3 my-4 shadow-md divide-x">
					<div className="flex items-center">
						<Image src={require('../../resources/images/ducoin.png')} width={50} height={50} alt={''} />
						<div className="ml-2">
							<p className="text-teal-500 text-xs whitespace-normal">Gamer Name</p>
							<p className="text-teal-500 text-xs whitespace-normal">Gamer Name</p>
						</div>
					</div>
					<div className="flex justify-around items-center w-1/2">
						<p className="text-center text-xs">$25.00 USD</p>
						<button
							className="button bg-emerald-400 rounded-md text-black text-lg font-semibold p-3"
							onClick={() => console.log('will buy later')}
						>
							Buy
						</button>
					</div>
				</div>
				<div className="flex w-full justify-between items-center bg-slate-800 rounded-lg p-3 my-4 shadow-md divide-x">
					<div className="flex items-center">
						<Image src={require('../../resources/images/ducoin.png')} width={50} height={50} alt={''} />
						<div className="ml-2">
							<p className="text-teal-500 text-xs whitespace-normal">Gamer Name</p>
							<p className="text-teal-500 text-xs whitespace-normal">Gamer Name</p>
						</div>
					</div>
					<div className="flex justify-around items-center w-1/2">
						<p className="text-center text-xs">$25.00 USD</p>
						<button
							className="button bg-emerald-400 rounded-md text-black text-lg font-semibold p-3"
							onClick={() => console.log('will buy later')}
						>
							Buy
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ExploreMore
