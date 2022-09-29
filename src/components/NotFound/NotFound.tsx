import { Link } from 'react-router-dom'
import styles from './notFound.module.scss'

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>
        404 <br />
        Not Found
      </h1>
      <p>🤔</p>
      <Link to='/'>Go Home</Link>
    </div>
  )
}
