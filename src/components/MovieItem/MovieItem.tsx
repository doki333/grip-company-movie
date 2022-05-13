import { useRecoil } from 'hooks/state'
import { isDraggable, modalVisibleState, selectedMovieInfo } from 'hooks/state/movie.atom'
import { IMovieItem } from 'types/search'
import styles from './moveItem.module.scss'
import { cx } from 'styles'
import store from 'storejs'
import placeholderImg from 'assets/no-image.jpg'
import React, { useRef, useState } from 'react'
import { CgMenuGridO } from 'react-icons/cg'

let dragStartIndex: number | undefined

export const MovieItem = ({ title, year, type, poster, imdbID }: IMovieItem) => {
  const [isDragPossible] = useRecoil(isDraggable)
  const [, setShowModal] = useRecoil(modalVisibleState)
  const [, setSelectedInfo] = useRecoil(selectedMovieInfo)

  const sliceTitle = title.length >= 25 ? `${title.slice(0, 25)}...` : title

  const getLocalStorageData = store.get('#M@VIeFavorITe') ?? []
  const isBookmarked = getLocalStorageData.findIndex((content: IMovieItem) => content.imdbID === imdbID)
  // 로컬스토리지 안에 있을때

  const handleClickList = () => {
    setShowModal(true)
    setSelectedInfo({ title, year, type, poster, imdbID })
  }

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>): void => {
    e.dataTransfer.effectAllowed = 'move'
    if (e.currentTarget.parentElement) {
      e.dataTransfer.setDragImage(e.currentTarget.parentElement, 350, 70)
      dragStartIndex = Number(e.currentTarget.closest('li')?.dataset.index)
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLLIElement>) => {
    const enterIndex = Number(e.currentTarget.closest('li')?.dataset.index)
    if (enterIndex === dragStartIndex) return
    const filteredArr = getLocalStorageData.filter((movie: IMovieItem, index: number) => index !== dragStartIndex)

    filteredArr.splice(enterIndex, 0, getLocalStorageData[Number(dragStartIndex)])
    // console.log(getLocalStorageData[Number(dragStartIndex)])
    // store.set('#M@VIeFavorITe', filteredArr)

    // console.log('', e.currentTarget.closest('li'), e.currentTarget)
  }

  const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault()
    dragStartIndex = undefined
    // const dragEndIndex = Number(e.currentTarget.dataset.index)
  }

  return (
    <li
      className={styles.movieInfoInner}
      role='menuitem'
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onClick={handleClickList}
      data-index={isBookmarked}
    >
      <div className={cx(styles.posterBlock, { [styles.bookmarked]: isBookmarked !== -1 })}>
        <img
          draggable='false'
          src={poster === 'N/A' ? placeholderImg : poster}
          alt='movie poster'
          aria-label='movie poster'
        />
      </div>
      <div className={styles.infoBlock}>
        <p className={styles.titleText}>{sliceTitle}</p>
        <p>Year: {year}</p>
        <p className={styles.typeText}>Type: {type}</p>
      </div>
      {isDragPossible && (
        <button type='button' className={styles.editBtn} onDragStart={handleDragStart} draggable='true'>
          <CgMenuGridO size='25px' />
        </button>
      )}
    </li>
  )
}
