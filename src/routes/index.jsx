import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'
// import TodoList from './TodoList'
// import Weather from './Weathers'
// import GNB from 'routes/_shared/GNB'
import { Search } from './search/search'
import { Favorites } from './favorites/favorites'
import { NavTab } from './_shared/GNB/NavTab/NavTab'
import { FavoriteToggleModal } from 'components/Modal/FavoriteToggleModal'
import { useRecoil } from 'hooks/state'
import { modalVisibleState } from 'hooks/state/movie.atom'
import { Suspense } from 'react'

const App = () => {
  const [isModalVisible] = useRecoil(modalVisibleState)
  return (
    <div className={styles.appWrapper}>
      {isModalVisible && <FavoriteToggleModal />}
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
        <NavTab />
      </div>
    </div>
  )
}

export default App
