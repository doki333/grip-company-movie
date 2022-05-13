import styles from './commonMovieList.module.scss'
import { MovieItem } from 'components/MovieItem/MovieItem'
import React, { useCallback } from 'react'
import { IMovieArr } from 'types/search'
import { cx } from 'styles'
import { mappingData } from 'types/moveList'
import { useRecoil } from 'hooks/state'

export const CommonMovieList = ({ data, scrollEvent, keyword, isEmpty, emptyText, msgRef }: mappingData) => {
  const isKeywordMovie = keyword === 'movie'

  const handleDragOver = useCallback((e: React.DragEvent<HTMLUListElement>): void => {
    e.preventDefault()
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
          {data.map((item, index) => (
            <MovieItem
              title={item.title}
              year={item.year}
              type={item.type}
              imdbID={item.imdbID}
              poster={item.poster}
              key={`${keyword}-${index + Math.random()}`}
            />
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
