import React from 'react'
import styles from '../../styles/components/Loading.module.css'
import LoadingSpinner from './LoadingSpinner'

// TODO: Implement more placesc
const Loading = () => {
	return (
		<main className={styles.container}>
			<span className={`${styles.text} mb-3 text-white`}>Loading...</span>
			<LoadingSpinner />
		</main>
	)
}

export default Loading
