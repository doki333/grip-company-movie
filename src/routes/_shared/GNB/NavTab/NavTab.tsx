import { NavLink, useLocation } from 'react-router-dom'
import styles from './NavTab.module.scss'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import cx from 'classnames'
import { SearchIcon } from 'assets/svgs'

export const NavTab = () => {
  const { pathname } = useLocation()
  const isSearching = pathname === '/'
  return (
    <nav className={styles.navWrapper}>
      <NavLink to='/' className={cx({ [styles.isSearching]: isSearching })}>
        <SearchIcon />
      </NavLink>
      <NavLink to='/favorites' className={cx({ [styles.isActive]: !isSearching })}>
        {pathname === '/favorites' ? <BsBookmarkStarFill size='30px' /> : <BsBookmarkStar size='30px' />}
      </NavLink>
    </nav>
  )
}
