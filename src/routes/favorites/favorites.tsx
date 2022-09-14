import store from 'storejs'
import { LayOut } from 'components/LayOut/LayOut'
import MovieList2 from 'components/MovieList/MovieList2'
import styles from './favorites.module.scss'

export const Favorites = () => {
  const getStoredData = store.get('#M@VIeFavorITe') || []
  const emptyText = '즐겨찾기 항목이 없습니다.'

  return (
    <LayOut title='내 즐겨찾기'>
      <div className={styles.starWrapper}>
        <MovieList2 listThing={getStoredData} />
        {getStoredData.length === 0 && <p>{emptyText}</p>}
      </div>
    </LayOut>
  )
}
