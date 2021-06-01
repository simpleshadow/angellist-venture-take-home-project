import Link from 'next/link'

type NavProps = {
  title?: string
}

const links = [
  {
    title: 'Allocation',
    href: '/deals/allocation',
  },
  {
    title: 'Questions',
    href: '/questions',
  },
]

const Nav = ({ title }: NavProps) => (
  <nav className="fixed top-0 w-full bg-white py-1">
    <div className="flex items-center py-8 px-12">
      <Link href="/">
        <img
          src="/images/angellist-venture-logo.svg"
          className="w-36 mr-6 mt-2 opacity-100 hover:opacity-60 cursor-pointer transition-opacity ease-in-out hidden md:block"
        />
      </Link>
      {title && <h1 className="text-lg md:text-xl font-bold md:pl-6 md:border-l border-gray-400">{title}</h1>}
      <div className="inline-flex gap-6 ml-auto md:text-lg">
        {links.map(({ href, title }) => (
          <span key="href" className="border-b border-transparent hover:border-b hover:border-black">
            <Link href={href}>{title}</Link>
          </span>
        ))}
      </div>
    </div>
  </nav>
)

export default Nav
