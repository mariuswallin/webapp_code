import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link href="/" passHref>
            <a className="first">Hjem</a>
          </Link>
        </li>
        <li>
          <Link href="/quiz">Quiz</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
