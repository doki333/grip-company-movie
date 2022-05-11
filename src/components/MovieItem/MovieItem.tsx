import { useRecoil } from 'hooks/state'
import { FavoritesState } from 'hooks/state/movie.atom'
import { IMovieArr } from 'types/search'
import styles from './moveItem.module.scss'

export const MovieItem = (item: IMovieArr) => {
  const [favorites, setFavorites] = useRecoil(FavoritesState)
  const onClickItem = () => {
    console.log('hello')
    console.log(item)
  }
  const { Title, Year, Type, Poster } = item
  return (
    <li className={styles.movieInfoInner}>
      <button type='button' onClick={onClickItem}>
        <div className={styles.posterBlock}>
          <img src={Poster} alt='movie poster' aria-label='movie poster' />
        </div>
        <div className={styles.infoBlock}>
          <p className={styles.titleText}>{Title}</p>
          <p className={styles.typeText}>Type: {Type}</p>
          <p>Year: {Year}</p>
        </div>
      </button>
    </li>
  )
}
