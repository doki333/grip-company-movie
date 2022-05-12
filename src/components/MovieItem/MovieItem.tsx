import { useRecoil } from 'hooks/state'
import { modalVisibleState, selectedMovieInfo } from 'hooks/state/movie.atom'
import { IMovieArr } from 'types/search'
import styles from './moveItem.module.scss'
import cx from 'classnames'
import store from 'storejs'
import { ItemType } from 'types/modal'
import placeholderImg from 'assets/no-image.jpg'

export const MovieItem = (item: IMovieArr) => {
  const [, setModalVisible] = useRecoil(modalVisibleState)
  const [, setMovieInfo] = useRecoil(selectedMovieInfo)
  const onClickItem = () => {
    setModalVisible(true)
    setMovieInfo(item)
  }
  const { Title, Year, Type, Poster, imdbID } = item
  const sliceTitle = Title.length >= 25 ? `${Title.slice(0, 25)}...` : Title

  const getLocalStorageData = store.get('#M@VIeFavorITe') ?? []
  const isBookmarked = getLocalStorageData.findIndex((content: ItemType) => content.imdbID === imdbID) !== -1
  // 로컬스토리지 안에 있을때

  return (
    <li className={styles.movieInfoInner}>
      <button type='button' onClick={onClickItem}>
        <div className={cx(styles.posterBlock, { [styles.bookmarked]: isBookmarked })}>
          <img src={Poster === 'N/A' ? placeholderImg : Poster} alt='movie poster' aria-label='movie poster' />
        </div>
        <div className={styles.infoBlock}>
          <p className={styles.titleText}>{sliceTitle}</p>
          <p>Year: {Year}</p>
          <p className={styles.typeText}>Type: {Type}</p>
        </div>
      </button>
    </li>
  )
}
