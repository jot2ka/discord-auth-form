export default function HomePage() {
	return null
}

export async function getStaticProps() {
	return {
		redirect: {
			destination: '/login',
		},
	}
}
