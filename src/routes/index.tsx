import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { SearchFor } from './Search/Search'
import { Favorites } from './Favorites/Favorites'

import { FavoriteToggleModal } from 'components/Modal/FavoriteToggleModal'
import { NotFound } from 'components/NotFound/NotFound'

import styles from './Routes.module.scss'
import { PortalCreate } from 'components/Modal/PortalCreate'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'

const App = () => {
  const isModalVisible = useSelector((state: RootState) => state.movie.isVisible)

  return (
    <div className={styles.appWrapper}>
      {isModalVisible && (
        <PortalCreate>
          <FavoriteToggleModal />
        </PortalCreate>
      )}
      <Suspense
        fallback={
          <div className={styles.suspenser}>
            <span className={styles.circle} />
            Wait..
          </div>
        }
      >
        <Routes>
          <Route path='/' element={<SearchFor />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
