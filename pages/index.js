
import Link from 'next/link'
import Head from 'next/head'

const Index = () => (
    <div>
        <Head>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.4/css/mdb.min.css" rel="stylesheet" />
        </Head>
        <Link href="/login">
            <a>Login</a>
        </Link>
        <p>Hello Next.js</p>
    </div>
)

export default Index
