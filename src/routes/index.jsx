import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'
// import TodoList from './TodoList'
// import Weather from './Weathers'
// import GNB from 'routes/_shared/GNB'
import { Search } from './search/search'
import { Favorites } from './favorites/favorites'
import { NavTab } from './_shared/GNB/NavTab/NavTab'

const App = () => {
  return (
    <div className={styles.appWrapper}>
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
