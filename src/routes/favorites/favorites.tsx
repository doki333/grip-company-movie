import styles from './favorites.module.scss'
import store from 'storejs'
import { MovieItem } from 'components/MovieItem/MovieItem'
import { IMovieArr } from 'types/search'
import { LayOut } from 'components/LayOut'

export const Favorites = () => {
  const getStoredData = store.get('#M@VIeFavorITe')
  const isEmpty = !getStoredData || getStoredData.length === 0

  return (
    <LayOut title='내 즐겨찾기'>
      {isEmpty ? (
        <p>즐겨찾기 항목이 없습니다.</p>
      ) : (
        <ul className={styles.favoriteItemsWrapper}>
          {getStoredData.map((data: IMovieArr) => (
            <MovieItem {...data} key={`favorite-${data.imdbID}`} />
          ))}
        </ul>
      )}
    </LayOut>
  )
}
