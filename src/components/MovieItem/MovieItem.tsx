import { useRecoil } from 'hooks/state'
import { favoriteMovieList, isItemDraggable, modalVisibleState, infoOnModalState } from 'hooks/state/movie.atom'
import { IMovieItem } from 'types/search'
import styles from './moveItem.module.scss'
import { cx } from 'styles'
import store from 'storejs'
import { IoIosBookmark } from 'react-icons/io'
import placeholderImg from 'assets/no-image.jpg'
import { CgMenuGridO } from 'react-icons/cg'
import { initialState } from 'types/movieItem'

export const initialDnDstate: initialState = {
  draggedFrom: 0,
  draggedTo: 0,
  isDragging: false,
  updatedOrder: [],
}

export const MovieItem = ({ title, year, type, poster, imdbID }: IMovieItem) => {
  const [isDragPossible] = useRecoil(isItemDraggable)
  const [, setShowModal] = useRecoil(modalVisibleState)
  const [, setSelectedInfo] = useRecoil(infoOnModalState)
  const [bookmark, setBookmark] = useRecoil(favoriteMovieList)

  const sliceTitle = title.length >= 25 ? `${title.slice(0, 25)}...` : title

  const getLocalStorageData = store.get('#M@VIeFavorITe') ?? []
  const isBookmarked = getLocalStorageData.findIndex((content: IMovieItem) => content.imdbID === imdbID)
  const updateIndex = bookmark.findIndex((content: IMovieItem) => content.imdbID === imdbID)
  // 로컬스토리지 안에 있을때

  const handleClickList = () => {
    setShowModal(true)
    setSelectedInfo({ title, year, type, poster, imdbID })
  }

  const onDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    const initialPosition = Number(e.currentTarget.dataset.index)
    initialDnDstate.draggedFrom = initialPosition
    initialDnDstate.isDragging = true
  }

  const onDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault()

    const lastPosition = Number(e.currentTarget.dataset.index)
    initialDnDstate.draggedTo = lastPosition

    let newList = [...bookmark]

    const { draggedFrom } = initialDnDstate
    const itemDragged = newList[draggedFrom]
    const remainingItems = newList.filter((item, index) => index !== draggedFrom)

    newList = [...remainingItems.slice(0, lastPosition), itemDragged, ...remainingItems.slice(lastPosition)]

    if (lastPosition === initialDnDstate.draggedTo) {
      initialDnDstate.updatedOrder = newList
      initialDnDstate.draggedTo = lastPosition
    }
  }

  const onDrop = () => {
    if (initialDnDstate.draggedFrom === initialDnDstate.draggedTo) return
    setBookmark(initialDnDstate.updatedOrder)
    store.set('#M@VIeFavorITe', initialDnDstate.updatedOrder)
    initialDnDstate.isDragging = false
  }

  return (
    <li
      className={cx(styles.movieInfoInner, { [styles.dragList]: isDragPossible })}
      role='menuitem'
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={handleClickList}
      data-index={updateIndex}
      onDragStart={onDragStart}
      draggable={isDragPossible ? 'true' : 'false'}
    >
      <div className={cx(styles.posterBlock, { [styles.bookmarked]: isBookmarked !== -1 })}>
        <img
          draggable='false'
          src={poster === 'N/A' ? placeholderImg : poster}
          alt='movie poster'
          aria-label='movie poster'
        />
        {isBookmarked !== -1 && <IoIosBookmark size='45px' />}
      </div>
      <div className={styles.infoBlock}>
        <p className={styles.titleText}>{sliceTitle}</p>
        <p>Year: {year}</p>
        <p className={styles.typeText}>Type: {type}</p>
      </div>
      {isDragPossible && (
        <button type='button' className={styles.editBtn}>
          <CgMenuGridO size='25px' />
        </button>
      )}
    </li>
  )
}
