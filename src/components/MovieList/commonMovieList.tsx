import styles from './commonMovieList.module.scss'
import { MovieItem } from 'components/MovieItem/MovieItem'
import { cx } from 'styles'
import { mappingData } from 'types/moveList'

export const CommonMovieList = ({ data, scrollEvent, keyword, emptyText, msgRef }: mappingData) => {
  const isKeywordMovie = keyword === 'movie'

  return (
    <div className={styles.movieListWrapper}>
      {data.length === 0 ? (
        <p>{emptyText}</p>
      ) : (
        <ul onScroll={scrollEvent} className={cx(styles.itemsWrapper, { [styles.isTaller]: !isKeywordMovie })}>
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
