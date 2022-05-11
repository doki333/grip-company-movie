import React from 'react'
import { PortalCreate } from './PortalCreate'
import styles from './modal.module.scss'
import { FavoritesState, modalVisibleState, selectedMovieInfo } from 'hooks/state/movie.atom'
import { useRecoil } from 'hooks/state'
import { AiOutlineClose, AiOutlineStar, AiFillStar } from 'react-icons/ai'

export const FavoriteToggleModal = () => {
  const [selectedInfo, , resetSelectedInfo] = useRecoil(selectedMovieInfo)

  const [favorite, setFavorite] = useRecoil(FavoritesState)
  const [, setIsVisible] = useRecoil(modalVisibleState)
  const handleModalClose = () => {
    setIsVisible((prev) => !prev)
    resetSelectedInfo()
  }
  const handleClickStarBtn = () => {
    setFavorite((prev) => [...prev].concat(selectedInfo))
    console.log(favorite)
  }

  return (
    <PortalCreate>
      <div className={styles.modalWrapper}>
        <div className={styles.modalInner}>
          <main className={styles.modalInfo}>
            <img alt='movie Poster' src={selectedInfo.Poster} />
            <p className={styles.infoTitle}>
              {selectedInfo.Title}
              <span>({selectedInfo.Year})</span>
            </p>
            <p>Add to Favorites?</p>
          </main>
          <div className={styles.modalBtns}>
            <button type='button' onClick={handleClickStarBtn}>
              <AiOutlineStar size='30px' />
            </button>
            <button type='button' onClick={handleModalClose}>
              <AiOutlineClose size='30px' />
            </button>
          </div>
        </div>
      </div>
    </PortalCreate>
  )
}
