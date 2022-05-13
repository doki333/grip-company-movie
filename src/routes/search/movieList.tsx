import React, { useCallback, useRef } from 'react'
import { useRecoil } from 'hooks/state'
import { movieInfo, pageNumberState, searchedState } from 'hooks/state/movie.atom'
import { getMovieList } from 'services/movie'
import styles from './movieList.module.scss'

let timer: NodeJS.Timeout

export const MovieList = () => {
  const msgRef = useRef<HTMLParagraphElement>(null)

  const [movieList, setMovieList] = useRecoil(movieInfo)
  const [pageNumber, setPageNumber] = useRecoil(pageNumberState)
  const [searchedText] = useRecoil(searchedState)

  const handleScrollEvent = useCallback(
    (e: React.UIEvent<HTMLUListElement>) => {
      const { scrollHeight, scrollTop, clientHeight } = e.currentTarget
      const isAtEnd = scrollHeight <= Math.ceil(scrollTop + clientHeight)

      if (isAtEnd) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          if (pageNumber.page >= pageNumber.wholePage && msgRef.current) {
            // 페이지가 끝으로 가면 다 됐다는 메세지 보여주고 리턴
            msgRef.current.style.display = 'block'
            return
          }
          getMovieList({ s: searchedText, page: pageNumber.page + 1, updater: setMovieList, counter: setPageNumber }) // 다음 페이지 데이터 불러오기
        }, 150)
      }
    },
    [pageNumber, searchedText, setMovieList, setPageNumber]
  )

  return (
    <div className={styles.movieListWrapper}>
      <p>검색 결과가 없습니다.</p>
    </div>
  )
}
