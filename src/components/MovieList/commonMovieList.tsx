import styles from './commonMovieList.module.scss'
import { MovieItem } from 'components/MovieItem/MovieItem'
import React, { useCallback } from 'react'
import { IMovieArr } from 'types/search'
import { cx } from 'styles'

interface mappingData {
  data: IMovieArr[]
  scrollEvent?: React.UIEventHandler<HTMLUListElement>
  keyword: string
  isEmpty: Boolean
  emptyText: string
  msgRef?: React.LegacyRef<HTMLParagraphElement>
}

export const CommonMovieList = ({ data, scrollEvent, keyword, isEmpty, emptyText, msgRef }: mappingData) => {
  const isKeywordMovie = keyword === 'movie'

  const handleDragOver = useCallback((e: React.DragEvent<HTMLUListElement>): void => {
    // console.log(e)
  }, [])

  return (
    <div className={styles.movieListWrapper}>
      {isEmpty ? (
        <p>{emptyText}</p>
      ) : (
        <ul
          onDragOver={handleDragOver}
          onScroll={scrollEvent}
          className={cx(styles.itemsWrapper, { [styles.isTaller]: !isKeywordMovie })}
        >
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
