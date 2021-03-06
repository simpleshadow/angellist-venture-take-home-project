import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Disclaimer, Nav } from '../components'

import '../styles/globals.css'

const navLinks = [
  {
    title: 'Allocator',
    href: '/deals/allocator',
  },
  {
    title: 'Questions',
    href: '/questions',
  },
]

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/deals/allocator')
    }
  }, [router.pathname])

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

      <Nav title={navLinks.find((link) => link.href === router.pathname)?.title || ''} links={navLinks} />
      <div className="overflow-x-hidden bg-angellist-off-white pb-8 px-8 md:px-12 pt-28 md:pt-44">
        <Component {...pageProps} />
        <Disclaimer />
      </div>
    </>
  )
}

export default MyApp
