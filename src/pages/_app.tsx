import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Disclaimer, Nav } from '../components'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/deals/allocation')
    }
  }, [router.pathname])

  let title = ''
  switch (router.pathname) {
    case '/deals/allocation':
      title = 'Allocation'
      break
    case '/questions':
      title = 'Questions'
    default:
      break
  }

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Nav title={title} />
      <div className="h-screen overflow-hidden bg-angellist-off-white pb-8 px-12 pt-44">
        <Component {...pageProps} />
        <Disclaimer />
      </div>
    </>
  )
}

export default MyApp
