import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from 'storejs'

import { RootState } from 'store/store'
import { setFavorite, setModalInfo, toggleModal } from 'store/reducers/movieReducer'

import { IMovieArr, IMovieItem } from 'types/search'

import { AiOutlineClose, AiOutlineStar, AiFillStar } from 'react-icons/ai'
import placeholderImg from '../../assets/no-image.jpg'

import { cx } from 'styles'
import styles from './modal.module.scss'

export const FavoriteToggleModal = () => {
  const modalInfo = useSelector((state: RootState) => state.movie.willStarred)[0]
  const favoriteList = useSelector((state: RootState) => state.movie.favoriteList)

  const getLocalStorageData = store.get('#M@VIeFavorITe') ?? [] // 로컬 스토리지에 저장되어 있는 데이터 가져오기
  const isItemThere = favoriteList.findIndex((item: IMovieArr) => item.imdbID === modalInfo.imdbID) !== -1

  const [isStored, setIsStored] = useState(isItemThere)
  const dispatch = useDispatch()

  const { Title: title, Poster: poster, Year: year } = modalInfo

  const handleModalClose = () => {
    dispatch(toggleModal(false))
    dispatch(setModalInfo([]))
  }

  const handleClickStarBtn = () => {
    const storedMovieIdx = getLocalStorageData.findIndex((item: IMovieItem) => item.imdbID === modalInfo.imdbID)

    if (!isItemThere) {
      // localStorage에 데이터를  밀어넣을 때
      store.set('#M@VIeFavorITe', [...getLocalStorageData, modalInfo])
      dispatch(setFavorite([...getLocalStorageData, modalInfo]))
      setIsStored(true)
      return
    }

    // 이미 있는 경우 지우기
    getLocalStorageData.splice(storedMovieIdx, 1)
    store.set('#M@VIeFavorITe', [...getLocalStorageData])
    dispatch(setFavorite([...getLocalStorageData]))
    setIsStored(false)
  }

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalInner}>
        <main className={styles.modalInfo}>
          <img alt='movie Poster' src={poster === 'N/A' ? placeholderImg : poster} />
          <p className={styles.infoTitle}>
            {title}
            <span>({year})</span>
          </p>
          <p className={styles.noticeText}>{isStored ? `Remove?` : 'Add to Favorites?'}</p>
        </main>
        <div className={styles.modalBtns}>
          <button
            type='button'
            onClick={handleClickStarBtn}
            className={cx(styles.starBtn, { [styles.fillStar]: isStored === true })}
          >
            {isStored ? <AiFillStar size='30px' /> : <AiOutlineStar color='white' size='30px' />}
          </button>
          <button type='button' onClick={handleModalClose} className={styles.cancelBtn}>
            <AiOutlineClose size='30px' />
          </button>
        </div>
      </div>
    </div>
  )
}
