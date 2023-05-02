if (typeof window !== 'undefined') {
	// Check if the browser supports service workers
	if ('serviceWorker' in navigator) {
		// Register the service worker
		window.addEventListener('load', function () {
			navigator.serviceWorker.register('/service-worker.js').then(
				(registration) => {
					console.log('Service Worker registered with scope: ', registration.scope)
				},
				(err) => {
					console.error('Service Worker registration failed: ', err)
				}
			)
		})
	}
}
