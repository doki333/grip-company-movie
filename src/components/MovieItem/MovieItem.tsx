import { DragEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from 'storejs'

import { RootState } from 'store/store'
import { setFavorite, setModalInfo, toggleModal } from 'store/reducers/movieReducer'

import { IMovieItem } from 'types/movieItem'
import { IMovieArr } from 'types/search'

import { IoIosBookmark } from 'react-icons/io'
import { MdDragIndicator } from 'react-icons/md'
import placeholderImg from 'assets/no-image.jpg'

import styles from './movieItem.module.scss'

let startIdx = 0
let firstArr: [] | IMovieArr[] = []

const MovieItem = ({ title, year, type, poster, imdbID }: IMovieItem) => {
  const { pathname } = useLocation()
  const isDraggable = pathname === '/favorites'

  const dispatch = useDispatch()
  const storedList = useSelector((state: RootState) => state.movie.favoriteList)
  const isItemStored = storedList.findIndex((item: IMovieArr) => item.imdbID === imdbID)

  const handleClickBtn = () => {
    dispatch(toggleModal(true))
    dispatch(setModalInfo([{ Title: title, Year: year, Type: type, Poster: poster, imdbID }]))
  }

  const handleDragStart = (e: DragEvent<HTMLLIElement>) => {
    e.dataTransfer.effectAllowed = 'move'

    if (e.currentTarget.dataset.index) {
      const { index } = e.currentTarget.dataset
      startIdx = Number(index)
    }
  }

  const handleDrop = (e: DragEvent<HTMLLIElement>) => {
    e.dataTransfer.dropEffect = 'move'
    dispatch(setFavorite(firstArr))
    store.set('#M@VIeFavorITe', firstArr)
  }

  const handleDragOver = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault()
  }

  const handleDragEnter = (e: DragEvent<HTMLLIElement>) => {
    const currentIdx = Number(e.currentTarget.dataset.index)

    if (startIdx === currentIdx) {
      firstArr = [...storedList]
      return
    }

    let newList = [...storedList]
    const newIdx = Number(e.currentTarget.dataset.index)

    const draggingItem = storedList[startIdx]
    const notDraggingItem = newList.filter((item, idx) => idx !== startIdx)

    newList = [...notDraggingItem.slice(0, newIdx), draggingItem, ...notDraggingItem.slice(newIdx)]

    firstArr = newList
  }

  return (
    <li
      key={`list-${imdbID}`}
      className={styles.movieBlock}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      draggable={isDraggable}
      data-index={isItemStored}
    >
      <button type='button' onClick={handleClickBtn} className={styles.movieWrapper}>
        <div className={styles.posterWrapper}>
          <img
            alt='movie poster'
            aria-label='movie poster'
            src={poster === 'N/A' ? placeholderImg : poster}
            draggable={false}
          />
          {isItemStored !== -1 && <IoIosBookmark size='55px' />}
        </div>
        <ul className={styles.infoWrapper}>
          <li className={styles.titleText}>{title}</li>
          <li>Year: {year}</li>
          <li className={styles.typeText}>{type}</li>
        </ul>
        {isDraggable && <MdDragIndicator size='12px' className={styles.dragBtn} color='white' />}
      </button>
    </li>
  )
}

export default MovieItem
