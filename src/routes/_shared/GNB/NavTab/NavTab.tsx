import { Link, useLocation } from 'react-router-dom'
import styles from './NavTab.module.scss'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import cx from 'classnames'
import { SearchIcon } from 'assets/svgs'

export const NavTab = () => {
  const { pathname } = useLocation()
  const isSearching = pathname === '/'
  return (
    <nav className={styles.navWrapper}>
      <Link to='/' className={cx({ [styles.isSearching]: isSearching })}>
        <SearchIcon />
      </Link>
      <Link to='/favorites'>
        {pathname === '/favorites' ? <BsBookmarkStarFill size='30px' /> : <BsBookmarkStar size='30px' />}
      </Link>
    </nav>
  )
}
