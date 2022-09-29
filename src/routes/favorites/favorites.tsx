import { useSelector } from 'react-redux'

import { RootState } from 'store/store'
import { LayOut } from 'components/LayOut/LayOut'
import CommonMovieList from 'components/MovieList/CommonMovieList'

import styles from './favorites.module.scss'

export const Favorites = () => {
  const getStoredData = useSelector((state: RootState) => state.movie.favoriteList)
  const emptyText = '즐겨찾기 항목이 없습니다.'

  return (
    <LayOut title='내 즐겨찾기'>
      <div className={styles.starWrapper}>
        <CommonMovieList listThing={getStoredData} />
        {getStoredData.length === 0 && <p>{emptyText}</p>}
      </div>
    </LayOut>
  )
}
