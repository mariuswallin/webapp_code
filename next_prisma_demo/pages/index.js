import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link href="/">
        <a>Hjem</a>
      </Link>
      <h1>Dette er hjem</h1>
    </div>
  )
}
