import { FavoriteToggleModal } from 'components/Modal/FavoriteToggleModal'
import { useRecoil } from 'hooks/state'
import { modalVisibleState, selectedMovieInfo } from 'hooks/state/movie.atom'
import { IMovieArr } from 'types/search'
import styles from './moveItem.module.scss'

export const MovieItem = (item: IMovieArr) => {
  const [, setModalVisible] = useRecoil(modalVisibleState)
  const [, setMovieInfo] = useRecoil(selectedMovieInfo)
  const onClickItem = () => {
    setModalVisible(true)
    setMovieInfo(item)
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
