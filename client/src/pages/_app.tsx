import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Container fluid>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </SessionProvider>
  )
}
