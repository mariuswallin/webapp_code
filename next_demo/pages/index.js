import Link from 'next/link'

import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Link href="/feedbacks">
        <a>Feedback</a>
      </Link>
    </div>
  )
}
