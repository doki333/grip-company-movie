import { MovieItem } from 'components/MovieItem'
import { useRecoil } from 'hooks/state'
import { movieInfo, pageNumberState, searchedState } from 'hooks/state/atom'
import React, { useCallback, useRef } from 'react'
import { getMovieList } from 'services/movie'
import { IMovieArr } from 'types/search'
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
            msgRef.current.style.display = 'block'
            return
          }
          getMovieList({ s: searchedText, page: pageNumber.page + 1, updater: setMovieList, counter: setPageNumber })
        }, 150)
      }
    },
    [pageNumber, searchedText, setMovieList, setPageNumber]
  )

  return (
    <div className={styles.movieListWrapper}>
      {movieList.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <ul onScroll={handleScrollEvent}>
          {movieList.map((movie: IMovieArr) => (
            <MovieItem {...movie} key={`movie-${movie.imdbID + Math.random()}`} />
          ))}
          <p className={styles.endMsg} ref={msgRef}>
            검색 결과가 더이상 없습니다!
          </p>
        </ul>
      )}
    </div>
  )
}
