import styles from './Routes.module.scss'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Search } from './search/search'
import { Favorites } from './favorites/favorites'
import { NavTab } from './_shared/NavTab'
import { FavoriteToggleModal } from 'components/Modal/FavoriteToggleModal'
import { useRecoil } from 'hooks/state'
import { modalVisibleState } from 'hooks/state/movie.atom'
import { NotFound } from 'components/NotFound/NotFound'

const App = () => {
  const [isModalVisible] = useRecoil(modalVisibleState)
  return (
    <div className={styles.appWrapper}>
      {isModalVisible && <FavoriteToggleModal />}
      <div className={styles.app}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route exact path='/' element={<Search />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <NavTab />
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
