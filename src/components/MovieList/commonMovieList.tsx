import styles from './commonMovieList.module.scss'
import { MovieItem } from 'components/MovieItem/MovieItem'
import React from 'react'
import { IMovieArr } from 'types/search'
import { cx } from 'styles'
import { useRecoil } from 'hooks/state'
import { isLoading } from 'hooks/state/movie.atom'
import { Spinner } from 'components/Spinner/Spinner'

interface mappingData {
  data: Array<IMovieArr>
  scrollEvent?: React.UIEventHandler<HTMLUListElement>
  keyword: string
  isEmpty: Boolean
  emptyText: string
  msgRef?: React.LegacyRef<HTMLParagraphElement>
}

export const CommonMovieList = ({ data, scrollEvent, keyword, isEmpty, emptyText, msgRef }: mappingData) => {
  const isKeywordMovie = keyword === 'movie'

  return (
    <div className={styles.movieListWrapper}>
      {isEmpty ? (
        <p>{emptyText}</p>
      ) : (
        <ul onScroll={scrollEvent} className={cx(styles.itemsWrapper, { [styles.isTaller]: !isKeywordMovie })}>
          {data.map((value: IMovieArr) => (
            <MovieItem {...value} key={`${keyword}-${value.imdbID + Math.random()}`} />
          ))}

          {isKeywordMovie && (
            <p ref={msgRef} className={styles.endMsg}>
              {emptyText}
            </p>
          )}
        </ul>
      )}
    </div>
  )
}
