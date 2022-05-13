import store from 'storejs'
import { PortalCreate } from './PortalCreate'
import styles from './modal.module.scss'
import { modalVisibleState, selectedMovieInfo } from 'hooks/state/movie.atom'
import { useRecoil } from 'hooks/state'
import { AiOutlineClose, AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { useState } from 'react'
import { ItemType } from 'types/modal'

export const FavoriteToggleModal = () => {
  const [selectedInfo, , resetSelectedInfo] = useRecoil(selectedMovieInfo)
  const [, setIsVisible] = useRecoil(modalVisibleState)

  const getLocalStorageData = store.get('#M@VIeFavorITe') ?? [] // 로컬 스토리지에 저장되어 있는 데이터 가져오기

  const findItem = getLocalStorageData.findIndex((item: ItemType) => item.imdbID === selectedInfo.imdbID) !== -1
  // 로컬스토리지 안에 있을때

  const [isStored, setIsStored] = useState(findItem)

  const handleModalClose = () => {
    setIsVisible((prev) => !prev)
    resetSelectedInfo()
  }

  const handleClickStarBtn = () => {
    if (!getLocalStorageData) {
      // 맨 처음 저장할 때
      store.set('#M@VIeFavorITe', [selectedInfo])
      setIsStored((prev) => !prev)
      return
    }
    const storedMovieIdx = getLocalStorageData.findIndex((item: ItemType) => item.imdbID === selectedInfo.imdbID)

    if (storedMovieIdx === -1) {
      // localStorage에 데이터를 밀어넣을 때
      store.set('#M@VIeFavorITe', [...getLocalStorageData, selectedInfo])
      setIsStored((prev) => !prev)
      return
    }

    // 이미 있는 경우 인덱스 찾아서 splice하고 다시 localStorage에 넣어주기
    getLocalStorageData.splice(storedMovieIdx, 1)
    store.set('#M@VIeFavorITe', [...getLocalStorageData])
    setIsStored((prev) => !prev)
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
            <p className={styles.noticeText}>{isStored ? `Remove?` : 'Add to Favorites?'}</p>
          </main>
          <div className={styles.modalBtns}>
            <button type='button' onClick={handleClickStarBtn} className={styles.starBtn}>
              {isStored ? <AiFillStar size='30px' /> : <AiOutlineStar size='30px' />}
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
