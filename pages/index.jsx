import Link from 'next/link'

import Layout from '../components/layout'

const Index = () => (
    <Layout>
        <Link href="/login">
            <a>Login</a>
        </Link>
        <p>Hello Next.js</p>
        <button className="button">Aha</button>
    </Layout>
)

export default Index
