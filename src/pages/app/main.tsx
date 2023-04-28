import * as React from 'react'
import Layout from '@/components/Layout/mainLayout'

const MainPage = () => {
	return <div>main</div>
}

MainPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default MainPage
