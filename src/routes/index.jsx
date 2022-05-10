import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'
// import TodoList from './TodoList'
// import Weather from './Weathers'
// import GNB from 'routes/_shared/GNB'
import { Search } from './search/search'
import { Favorites } from './favorites/favorites'
import { NavTab } from './_shared/GNB/NavTab/NavTab'
import { Suspense } from 'react'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Suspense fallback={<div className={styles.fallback}>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Search />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </Suspense>
        <NavTab />
      </div>
    </div>
  )
}

export default App
