import { DragEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import store from 'storejs'

import { setModalInfo, toggleModal } from 'store/reducers/movieReducer'

import { IoIosBookmark } from 'react-icons/io'
import { MdDragIndicator } from 'react-icons/md'
import { IMovieItem } from 'types/movieItem'
import placeholderImg from 'assets/no-image.jpg'

import styles from './movieItem2.module.scss'

const MovieItem2 = ({ title, year, type, poster, imdbID }: IMovieItem) => {
  const getLocalStorageData = store.get('#M@VIeFavorITe') ?? []

  const { pathname } = useLocation()
  const isDraggable = pathname === '/favorites'
  const [isDragging, setIsDragging] = useState(false)
  const [list, setList] = useState(getLocalStorageData)

  const dispatch = useDispatch()
  const isItemStored = getLocalStorageData.findIndex((item: IMovieItem) => item.imdbID === imdbID)

  const handleClickBtn = () => {
    dispatch(toggleModal(true))
    dispatch(setModalInfo([{ Title: title, Year: year, Type: type, Poster: poster, imdbID }]))
  }

  const handleDragOver = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault()

    const enterIdx = Number(e.currentTarget.dataset.index)

    let newList = [...list]

    const startIdx = Number(e.dataTransfer.getData('text/plain'))
    const draggingItem = newList[startIdx]
    const notDraggingItem = newList.filter((item, index) => index !== startIdx)

    if (startIdx === enterIdx) return

    newList = [...notDraggingItem.slice(0, enterIdx), draggingItem, ...notDraggingItem.slice(enterIdx)]

    setList(newList)
  }

  const handleDragStart = (e: DragEvent<HTMLLIElement>) => {
    setIsDragging((prev) => !prev)
    e.dataTransfer.effectAllowed = 'move'
    const { index } = e.currentTarget.dataset

    if (index) {
      e.dataTransfer.setData('text/plain', index)
    }
  }

  const handleDrop = (e: DragEvent<HTMLLIElement>) => {
    setIsDragging((prev) => !prev)
    e.dataTransfer.dropEffect = 'move'
    store.set('#M@VIeFavorITe', list)
    e.dataTransfer.clearData('text/plain')
  }

  return (
    <li
      key={`list-${imdbID}`}
      className={styles.movieBlock}
      draggable={isDraggable}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
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
      </button>
      {isDraggable && (
        <button type='button' className={styles.dragBtn}>
          <MdDragIndicator size='26px' color='white' />
        </button>
      )}
    </li>
  )
}

export default MovieItem2
